import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getUsers } from '@/action/user'
import CardWrapper from '@/app/_components/card-wrapper'
import type { User } from '@/types/user'

import { auth } from '../../../../auth'
import { UsersTable } from './_components/user-table'

export const metadata: Metadata = {
  title: 'ユーザー 一覧',
}

export default async function UsersPage() {
  const session = await auth()
  const user = session?.user
  const users = await getUsers()

  if (user?.role !== 'admin') {
    redirect('/404')
  }

  return (
    <article className="pb-24 px-1">
      <CardWrapper title="ユーザー 一覧">
        <UsersTable data={users.data as User[]} />
      </CardWrapper>
    </article>
  )
}
