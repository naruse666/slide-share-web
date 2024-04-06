import { Suspense } from 'react'

import { ScrollArea } from '@/components/ui/scroll-area'

import CardWrapper from './_components/card-wrapper'
import Info from './_components/info'
import NewestSlideGroup from './_components/newest_slide_group'
import { SpeakerList } from './(main)/speakers/_components/speaker_list'

export default async function Home() {
  return (
    <article>
      <ScrollArea className="h-dvh px-4">
        <div className="flex flex-col gap-3 pt-12 pb-24 px-1">
          <CardWrapper
            title="TECH.C. LTサークルへようこそ 👋"
            description="興味がある方は、お気軽にお問い合わせください！"
            link={{
              href: '/contacts',
              text: 'お問い合わせ',
            }}
          >
            <Info />
          </CardWrapper>
          <CardWrapper
            title="発表者一覧"
            link={{
              href: '/speakers',
              text: 'すべての発表者を見る',
            }}
          >
            <SpeakerList isTop={true} />
          </CardWrapper>
          <CardWrapper
            title="新着LT"
            link={{
              href: '/slides?page=1',
              text: 'すべてのLTを見る',
            }}
          >
            <Suspense fallback={<div>Loading...</div>}></Suspense>
            <NewestSlideGroup />
          </CardWrapper>
        </div>
      </ScrollArea>
    </article>
  )
}
