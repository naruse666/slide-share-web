import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getSlide } from '@/action/slide'
import CardWrapper from '@/app/_components/card-wrapper'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

import { auth } from '../../../../../../auth'
import SlideEdit from './_components/slide_edit'

export default async function SlideDetailPage({
  params,
}: {
  params: { slide_group_id: string; slide_id: string }
}) {
  const session = await auth()
  const user = session?.user
  const slide = await getSlide(params.slide_group_id, params.slide_id)
  const isAdmin =
    user?.role === 'admin' || user?.speaker_id === slide.data.speaker_id

  if (!slide.isSuccess || slide.data === null) {
    redirect('/404')
  }

  if (!slide.data.is_publish) {
    if (user?.role !== 'admin' || user?.speaker_id !== slide.data.speaker_id) {
      redirect('/404')
    }
  }

  return (
    <article className="pb-24">
      <CardWrapper title={slide.data.title}>
        <div className="flex justify-between items-center">
          <Link
            href={`/speakers/${slide.data.speaker_id}`}
            className="my-3 flex gap-2 items-center transition-all hover:underline hover:opacity-80"
          >
            <Avatar className="w-8 h-8">
              <AvatarImage src={slide.data.speaker_image} />
              <AvatarFallback className="border">
                {slide.data.speaker_name[0]}
              </AvatarFallback>
            </Avatar>
            <p className="text-foreground">{slide.data.speaker_name}</p>
          </Link>
          {isAdmin && (
            <Badge
              variant="outline"
              className={`border ${slide.data.is_publish ? 'border-green-400 bg-green-400/50' : 'border-red-400 bg-red-400/50'}`}
            >
              {slide.data.is_publish ? '公開中' : '非公開'}
            </Badge>
          )}
        </div>
        <div className="grid place-items-center border shadow-md bg-[#212121] dark:bg-[#313131] rounded-md">
          <iframe
            src={slide.data.drive_pdf_url}
            className="w-full max-w-[920px] aspect-video"
          ></iframe>
        </div>
        {isAdmin && (
          <div className="flex justify-center items-center mt-5">
            <SlideEdit
              slide={slide.data}
              slideGroupId={params.slide_group_id}
            />
          </div>
        )}
      </CardWrapper>
    </article>
  )
}
