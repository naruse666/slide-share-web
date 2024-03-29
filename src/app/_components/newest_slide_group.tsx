import { getNewestSlideGroup } from '@/action/slide'
import { Skeleton } from '@/components/ui/skeleton'

import SlideItem, {
  SlideSkeleton,
} from '../(main)/slides/_components/slide_item'

export default async function NewestSlideGroup() {
  const newestSlideGroup = await getNewestSlideGroup()
  const skeltonNum = 4

  if (!newestSlideGroup.isSuccess || newestSlideGroup.data === null) {
    return null
  }

  return (
    <>
      {newestSlideGroup.data.id ? (
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
          <div className="mb-4 grid place-items-center">
            <Skeleton className="w-[130px] h-[25px] max-w-full" />
          </div>
          <div className="text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {Array.from({ length: skeltonNum }).map((_, index) => (
              <SlideSkeleton key={index} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
