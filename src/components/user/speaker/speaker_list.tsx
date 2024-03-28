import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const speakerList = [
  {
    name: 'User01',
    speaker_id: 'user01',
    school: '東京校',
    major: 'IT専攻',
    image: 'https://github.com/shadcn.png',
  },
  {
    name: 'User02',
    speaker_id: 'user02',
    school: '東京校',
    major: 'セキュリティ専攻',
    image: 'https://github.com/shadcn.png',
  },
  {
    name: 'User03',
    speaker_id: 'user03',
    school: '東京校',
    major: 'プログラマー専攻',
    image: 'https://github.com/shadcn.png',
  },
  {
    name: 'User04',
    speaker_id: 'user04',
    school: '福岡校',
    major: 'セキュリティ専攻',
    image: 'https://github.com/shadcn.png',
  },
  {
    name: 'User05',
    speaker_id: 'user05',
    school: '大阪校',
    major: 'スーパーITエンジニア',
    image: 'https://github.com/shadcn.png',
  },
  {
    name: 'User06',
    speaker_id: 'user06',
    school: '東京校',
    major: 'セキュリティ専攻',
    image: 'https://github.com/shadcn.png',
  },
  {
    name: 'User07',
    speaker_id: 'user07',
    school: '東京校',
    major: 'セキュリティ専攻',
    image: 'https://github.com/shadcn.png',
  },
  {
    name: 'User08',
    speaker_id: 'user08',
    school: '東京校',
    major: 'セキュリティ専攻',
    image: 'https://github.com/shadcn.png',
  },
  {
    name: 'User09',
    speaker_id: 'user09',
    school: '東京校',
    major: 'セキュリティ専攻',
    image: 'https://github.com/shadcn.png',
  },
]

export function SpeakerList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
      {speakerList.map((speaker, index) => (
        <Link
          key={index}
          href={`/speakers/${speaker.speaker_id}`}
          className="flex gap-2 transition-all duration-300 cursor-pointer hover:bg-black/10 hover:dark:bg-white/10 rounded-md p-2"
        >
          <Avatar className="w-10 h-10">
            <AvatarImage src={speaker.image} alt={`@${speaker.name}`} />
            <AvatarFallback>{speaker.name}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-foreground text-sm">
              {speaker.name}
            </h3>
            <p className="text-xs">
              {speaker.school}
              <span className="mx-0.5 text-xs">/</span>
              {speaker.major}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}
