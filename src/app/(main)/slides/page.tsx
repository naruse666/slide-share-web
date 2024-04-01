import { redirect } from 'next/navigation'

import { getSlideGroups, getSlideGroupsByPage } from '@/action/slide'
import CardWrapper from '@/app/_components/card-wrapper'
import { convertToJST } from '@/utils/convert-jwt'

import { auth } from '../../../../auth'
import SlideItem from './_components/slide_item'
import SlidePagination from './_components/slide_pagination'

export default async function SlidesPage({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const session = await auth()
  const user = session?.user
  const slideAllGroups = await getSlideGroups()
  const pageSlideGroups = await getSlideGroupsByPage(Number(searchParams.page))

  if (!slideAllGroups.isSuccess || !pageSlideGroups.isSuccess) {
    return <div>エラーが発生しました</div>
  }
  if (!searchParams.page) {
    redirect('/slides?page=1')
  }
  if (!pageSlideGroups.data) {
    console.log('pageSlideGroups.data', pageSlideGroups)
    return <div>スライドがありません</div>
  }

  return (
    <article className="pb-24 px-1">
      <CardWrapper
        title="スライド一覧"
        link={{
          href: `${user?.role === 'admin' ? '/slides/create-group' : '/'}`,
          text: `${user?.role === 'admin' ? 'グループを作成' : 'ダッシュボード'}`,
        }}
      >
        <SlidePagination
          currentPage={searchParams.page}
          pageNumber={Math.ceil(slideAllGroups.data.length / 5)}
        />
        <div className="py-6 flex flex-col gap-3">
          {pageSlideGroups.data.map((slideGroup, index) => (
            <CardWrapper
              key={index}
              title={slideGroup.title}
              description={convertToJST(slideGroup.presentation_at)}
              link={{
                href: `/slides/${slideGroup.id}`,
                text: `${slideGroup.title}を見る`,
              }}
            >
              {slideGroup.slide_list ? (
                <div className="text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                  {slideGroup.slide_list.map((slide, index) => (
                    <SlideItem
                      slide={slide}
                      group_id={slideGroup.id}
                      key={index}
                    />
                  ))}
                </div>
              ) : (
                <p>スライドがありません</p>
              )}
            </CardWrapper>
          ))}
        </div>
        <SlidePagination
          currentPage={searchParams.page}
          pageNumber={Math.ceil(slideAllGroups.data.length / 5)}
        />
      </CardWrapper>
    </article>
  )
}
