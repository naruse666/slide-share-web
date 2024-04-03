import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getSlideGroup } from '@/action/slide'
import CardWrapper from '@/app/_components/card-wrapper'
import type { User } from '@/types/user'

import { auth } from '../../../../../../../auth'
import UploadFormWrapper from '../_components/form-wrapper'
import PDFFrom from './_components/form'

export const metadata: Metadata = {
  title: 'PDF | スライドアップロード',
}

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
          <div className="flex gap-1 justify-center items-center mt-3 mr-6 group text-foreground">
            <ArrowLeft className="w-5 h-5 transition duration-300 group-hover:-translate-x-1" />
            <Link
              className="text-center"
              href={`/slides/${params.slide_group_id}/upload`}
            >
              戻る
            </Link>
          </div>
        </UploadFormWrapper>
      </CardWrapper>
    </article>
  )
}
