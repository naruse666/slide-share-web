import CardWrapper from '@/app/_components/card-wrapper'

import { auth } from '../../../../auth'
import SlidePagination from './_components/slide_pagination'

export default async function SlidesPage() {
  const session = await auth()
  const user = session?.user

  return (
    <article className="pb-24 px-1">
      <CardWrapper
        title="スライド一覧"
        link={{
          href: `${user?.role === 'admin' ? '/slides/create-group' : '/'}`,
          text: `${user?.role === 'admin' ? 'グループを作成' : 'ダッシュボードん'}`,
        }}
      >
        <p className="font-bold text-lg">slides page</p>
        <SlidePagination />
      </CardWrapper>
    </article>
  )
}
