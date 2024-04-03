import type { Metadata } from 'next'

import CardWrapper from '@/app/_components/card-wrapper'

import { SpeakerList } from './_components/speaker_list'

export const metadata: Metadata = {
  title: '発表者一覧',
}

export default function SpeakersPage() {
  return (
    <article className="pb-24 pr-1">
      <CardWrapper title="発表者一覧">
        <SpeakerList />
      </CardWrapper>
    </article>
  )
}
