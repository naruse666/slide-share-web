import { FileUp } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getSlideGroup } from '@/action/slide'
import CardWrapper from '@/app/_components/card-wrapper'
import { buttonVariants } from '@/components/ui/button'
import { convertToJST } from '@/utils/convert-jwt'

import { auth } from '../../../../../auth'
import SlideItem from '../_components/slide_item'
import GroupEdit from './_components/group_edit'

export default async function SlideGroupPage({
  params,
}: {
  params: { slide_group_id: string }
}) {
  const session = await auth()
  const user = session?.user
  const slideGroup = await getSlideGroup(params.slide_group_id)
  const isMember = user?.role == 'admin' || user?.role == 'speaker'

  if (!slideGroup.isSuccess || slideGroup.data === null) {
    redirect('/404')
  }

  return (
    <article className="pb-24 px-1">
      <CardWrapper
        title={slideGroup.data.title}
        description={convertToJST(slideGroup.data.presentation_at)}
        link={{
          href: '/slides',
          text: 'すべてのLTを見る',
        }}
      >
        {Boolean(slideGroup.data?.slide_list) ? (
          <div className="text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {slideGroup.data.slide_list.map((slide, index) => (
              <SlideItem
                slide={slide}
                group_id={slideGroup.data.id}
                key={index}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center py-6">
            <p className="text-foreground">まだスライドがありません</p>
          </div>
        )}
        {isMember && (
          <div className="flex justify-center items-center gap-3 flex-wrap pt-5">
            {user?.role === 'admin' && <GroupEdit />}
            <Link
              className={`${buttonVariants()} flex gap-1.5`}
              href={`/slides/${params.slide_group_id}/upload`}
            >
              スライドをアップロードする
              <FileUp />
            </Link>
          </div>
        )}
      </CardWrapper>
    </article>
  )
}
