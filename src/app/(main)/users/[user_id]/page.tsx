import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getUser } from '@/action/user'
import CardWrapper from '@/app/_components/card-wrapper'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import EditUserForm from './_components/edit-user/form'

export const metadata: Metadata = {
  title: '発表者詳細',
}

export default async function SpeakerDetailPage({
  params,
}: {
  params: { user_id: string }
}) {
  const godUser = await getUser(params.user_id)

  if (!godUser.isSuccess || !godUser.data) {
    redirect('/404')
  }

  return (
    <article className="pb-24 pr-1">
      <CardWrapper
        title={`${godUser.data.name} を編集`}
        link={{
          href: '/users',
          text: 'ユーザー 一覧を見る',
        }}
      >
        <EditUserForm user={godUser.data} />
      </CardWrapper>
    </article>
  )
}
