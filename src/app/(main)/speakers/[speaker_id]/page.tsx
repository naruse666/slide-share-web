import { redirect } from 'next/navigation'

import { getSpeaker } from '@/action/speaker'
import CardWrapper from '@/app/_components/card-wrapper'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import SlideItem from '../../slides/_components/slide_item'

export default async function SpeakerDetailPage({
  params,
}: {
  params: { speaker_id: string }
}) {
  const speaker = await getSpeaker(params.speaker_id)

  if (!speaker.isSuccess || !speaker.data || !speaker.data.speaker_id) {
    redirect('/404')
  }

  return (
    <article className="pb-24 pr-1">
      <CardWrapper
        title={`@${speaker.data.speaker_id}`}
        link={{
          href: '/speakers',
          text: '発表者一覧を見る',
        }}
      >
        <div className="flex flex-wrap justify-between font-semibold">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={speaker.data.image}
                alt={speaker.data.display_name}
              />
              <AvatarFallback className="border">
                {speaker.data.display_name[0]}
              </AvatarFallback>
            </Avatar>
            <p className="text-foreground">{speaker.data.display_name}</p>
          </div>
          <div className="h-10 flex items-center gap-1">
            <p>{speaker.data.school}</p>
            <span>/</span>
            <p>{speaker.data.course}</p>
          </div>
        </div>
        <p className="text-right mt-4 text-foreground">
          {speaker.data.slide_list ? speaker.data.slide_list.length : 0}{' '}
          スライド
        </p>
        {speaker.data.slide_list ? (
          <div className="mt-3 text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {speaker.data.slide_list.map((slide, index) => {
              slide.speaker_name = speaker.data.display_name
              slide.speaker_image = speaker.data.image
              return (
                <SlideItem
                  slide={slide}
                  group_id={slide.group_id}
                  key={index}
                />
              )
            })}
          </div>
        ) : (
          <div className="mt-3 mb-6 text-foreground">
            <p className="text-center">まだスライドがありません 🙇</p>
          </div>
        )}
      </CardWrapper>
    </article>
  )
}
