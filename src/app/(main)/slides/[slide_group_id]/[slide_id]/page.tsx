import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getSlide } from '@/action/slide'
import CardWrapper from '@/app/_components/card-wrapper'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default async function SlideDetailPage({
  params,
}: {
  params: { slide_group_id: string; slide_id: string }
}) {
  const slide = await getSlide(params.slide_group_id, params.slide_id)

  if (!slide.isSuccess || slide.data === null) {
    redirect('/404')
  }

  return (
    <article>
      <CardWrapper
        title={slide.data.title}
        link={{
          href: `/slides/${params.slide_group_id}`,
          text: '同じ題材のLTを見る',
        }}
      >
        <div className="grid place-items-center border shadow-md bg-[#212121] dark:bg-[#313131] rounded-md">
          <iframe
            src={slide.data.drive_pdf_url}
            className="w-full max-w-[920px] aspect-video"
          ></iframe>
        </div>
        <Link
          href={`/speakers/${slide.data.speaker_id}`}
          className="mt-3 flex gap-2 items-center transition-all hover:underline hover:opacity-80"
        >
          <Avatar className="w-8 h-8">
            <AvatarImage src={slide.data.speaker_image} />
            <AvatarFallback className="border">
              {slide.data.speaker_name[0]}
            </AvatarFallback>
          </Avatar>
          <p className="text-foreground">{slide.data.speaker_name}</p>
        </Link>
      </CardWrapper>
    </article>
  )
}
