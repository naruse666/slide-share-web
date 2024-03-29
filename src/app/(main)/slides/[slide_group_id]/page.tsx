import { redirect } from 'next/navigation'

import { getSlideGroup } from '@/action/slide'
import CardWrapper from '@/app/_components/card-wrapper'
import { convertToJST } from '@/utils/convert-jwt'

import SlideItem, { SlideSkeleton } from '../_components/slide_item'

export default async function SlideGroupPage({
  params,
}: {
  params: { slide_group_id: string }
}) {
  const slideGroup = await getSlideGroup(params.slide_group_id)
  const skeltonNum = 4

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
        {slideGroup.data.id ? (
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
          <div className="text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {Array.from({ length: skeltonNum }).map((_, index) => (
              <SlideSkeleton key={index} />
            ))}
          </div>
        )}
      </CardWrapper>
    </article>
  )
}
