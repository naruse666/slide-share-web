import Link from 'next/link'

import { getNewestSlideGroup } from '@/action/slide'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

import { auth } from '../../../auth'
import SlideItem, {
  SlideSkeleton,
} from '../(main)/slides/_components/slide_item'

export default async function NewestSlideGroup() {
  const session = await auth()
  const user = session?.user
  const isMember = user?.role === 'speaker' || user?.role === 'admin'
  const newestSlideGroup = await getNewestSlideGroup()
  const skeltonNum = 4

  if (!newestSlideGroup.isSuccess || newestSlideGroup.data === null) {
    return null
  }

  return (
    <>
      {Boolean(newestSlideGroup.data.slide_list) ? (
        <>
          <h3 className="text-foreground mb-4 text-center font-bold">
            「{newestSlideGroup.data.title}」
          </h3>
          <div className="text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {newestSlideGroup.data.slide_list.map((slide, index) => (
              <SlideItem
                slide={slide}
                group_id={newestSlideGroup.data.id}
                key={index}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          {!newestSlideGroup.data.id ? (
            <>
              <div className="mb-4 grid place-items-center">
                <Skeleton className="w-[130px] h-[25px] max-w-full" />
              </div>
              <div className="text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                {Array.from({ length: skeltonNum }).map((_, index) => (
                  <SlideSkeleton key={index} />
                ))}
              </div>
            </>
          ) : (
            <div>
              <h3 className="text-foreground mb-4 text-center font-bold">
                「{newestSlideGroup.data.title}」
              </h3>
              <div className="flex flex-col justify-center items-center gap-6 py-6">
                <p className="text-sm">まだスライドがありません</p>
                {isMember ? (
                  <Link
                    href={`/slides/${newestSlideGroup.data.id}/upload`}
                    className={`${buttonVariants()}`}
                  >
                    スライドをアップロードする
                  </Link>
                ) : (
                  <Link
                    href="/slides?page=1"
                    className={`${buttonVariants({ variant: 'outline' })}`}
                  >
                    ぜひ他のスライドをご覧ください
                  </Link>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  )
}
