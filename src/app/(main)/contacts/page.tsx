import type { Metadata } from 'next'

import CardWrapper from '@/app/_components/card-wrapper'
import type { User } from '@/types/user'

import { auth } from '../../../../auth'
import ContactFrom from './_components/form'

export const metadata: Metadata = {
  title: 'お問い合わせ',
}

export default async function ContactsPage() {
  const session = await auth()
  const user = session?.user

  return (
    <article className="pb-24 px-1">
      <CardWrapper
        title="お問い合わせ"
        description="お気軽にお問い合わせください！"
      >
        <div className="bg-primary/10 border w-full max-w-lg rounded-md shadow-md mx-auto p-3">
          <ContactFrom user={user as User} />
        </div>
      </CardWrapper>
    </article>
  )
}
