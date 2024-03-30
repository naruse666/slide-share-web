import { redirect } from 'next/navigation'

import { getSlideGroup } from '@/action/slide'
import CardWrapper from '@/app/_components/card-wrapper'
import type { User } from '@/types/user'

import { auth } from '../../../../../../../auth'
import UploadFormWrapper from '../_components/form-wrapper'
import PDFFrom from './_components/form'

export default async function UploadSlideFromPDFPage({
  params,
}: {
  params: { slide_group_id: string }
}) {
  const session = await auth()
  const user = session?.user
  const slideGroup = await getSlideGroup(params.slide_group_id)
  if (!user || user.role === 'user') {
    redirect('/404')
  }

  if (!slideGroup.isSuccess || slideGroup.data === null) {
    redirect('/404')
  }

  return (
    <article className="pb-24 px-1">
      <CardWrapper
        title={`${slideGroup.data.title} - アップロード - PDF`}
        link={{
          href: `/slides/${slideGroup.data.id}`,
          text: `${slideGroup.data.title} のLTを見る`,
        }}
      >
        <UploadFormWrapper>
          <PDFFrom user={user as User} slideGroupId={params.slide_group_id} />
        </UploadFormWrapper>
      </CardWrapper>
    </article>
  )
}
