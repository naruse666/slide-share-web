import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getSlideGroup } from '@/action/slide'
import CardWrapper from '@/app/_components/card-wrapper'

import { auth } from '../../../../../../auth'
import PDFImage from './assets/pdf.png'
import SlideImage from './assets/slides.png'

export default async function UploadPage({
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
        title={`${slideGroup.data.title} - アップロード`}
        link={{
          href: `/slides/${slideGroup.data.id}`,
          text: `${slideGroup.data.title} のLTを見る`,
        }}
      >
        <p className="text-center text-foreground mb-6">
          アップロードするファイルを選択してください
        </p>
        <div className="flex flex-wrap gap-6 justify-center items-center">
          <Link
            href={`/slides/${slideGroup.data.id}/upload/google-slides`}
            className="border rounded-md shadow-md py-6 px-4 cursor-pointer bg-primary/10 transition duration-300 hover:bg-primary/30"
          >
            <Image src={SlideImage} className="w-52" alt="スライドアイコン" />
            <p className="text-foreground text-center mt-4 font-semibold">
              Google Slides URL
            </p>
          </Link>
          <Link
            href={`/slides/${slideGroup.data.id}/upload/pdf`}
            className="border rounded-md shadow-md py-6 px-4 cursor-pointer bg-primary/10 transition duration-300 hover:bg-primary/30"
          >
            <Image src={PDFImage} className="w-52" alt="PDFアイコン" />
            <p className="text-foreground text-center mt-4 font-semibold">
              PDF
            </p>
          </Link>
        </div>
        <p className="text-center mt-6 text-sm text-balance">
          他のファイル形式が必要な場合は、管理者にお問い合わせください。
        </p>
      </CardWrapper>
    </article>
  )
}
