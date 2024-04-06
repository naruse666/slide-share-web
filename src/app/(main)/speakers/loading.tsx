import CardWrapper from '@/app/_components/card-wrapper'

import { SpeakerSkeleton } from './_components/loading/speaker-skelton'

export default function Loading() {
  const skeltonNum = 10

  return (
    <article className="pb-24 pr-1">
      <CardWrapper title="スライド一覧">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {Array.from({ length: skeltonNum }).map((_, index) => (
            <SpeakerSkeleton key={index} />
          ))}
        </div>
      </CardWrapper>
    </article>
  )
}
