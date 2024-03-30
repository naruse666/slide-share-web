import { redirect } from 'next/navigation'

import { getSlideGroups } from '@/action/slide'
import CardWrapper from '@/app/_components/card-wrapper'
import type { User } from '@/types/user'

import { auth } from '../../../../../auth'
import UploadFormWrapper from '../[slide_group_id]/upload/_components/form-wrapper'
import CreateGroupFrom from './_components/form'

export default async function CreateGroupPage() {
  const session = await auth()
  const user = session?.user
  const slideGroups = await getSlideGroups()
  if (!user || user.role !== 'admin') {
    redirect('/404')
  }

  return (
    <article className="pb-24 px-1">
      <CardWrapper title="グループを作成">
        <UploadFormWrapper>
          <CreateGroupFrom slideGroups={slideGroups.data} />
        </UploadFormWrapper>
      </CardWrapper>
    </article>
  )
}
