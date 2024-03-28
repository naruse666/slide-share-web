import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from '../ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

const slideList = {
  id: 'favorite_book',
  title: 'おすすめの本',
  slides: [
    {
      id: '1',
      title: 'プロトタイピングプレゼンテーション',
      image: '/dummy-lt-top.png',
      speaker: {
        name: 'User01',
        speaker_id: 'user01',
        image: 'https://github.com/shadcn.png',
      },
    },
    {
      id: '2',
      title: 'プロトタイピングプレゼンテーション',
      image: '/dummy-lt-top.png',
      speaker: {
        name: 'User01',
        speaker_id: 'user01',
        image: 'https://github.com/shadcn.png',
      },
    },
    {
      id: '3',
      title: 'プロトタイピングプレゼンテーション',
      image: '/dummy-lt-top.png',
      speaker: {
        name: 'User01',
        speaker_id: 'user01',
        image: 'https://github.com/shadcn.png',
      },
    },
    {
      id: '4',
      title: 'プロトタイピングプレゼンテーション',
      image: '/dummy-lt-top.png',
      speaker: {
        name: 'User01',
        speaker_id: 'user01',
        image: 'https://github.com/shadcn.png',
      },
    },
    {
      id: '5',
      title: 'プロトタイピングプレゼンテーション',
      image: '/dummy-lt-top.png',
      speaker: {
        name: 'User01',
        speaker_id: 'user01',
        image: 'https://github.com/shadcn.png',
      },
    },
    {
      id: '6',
      title: 'プロトタイピングプレゼンテーション',
      image: '/dummy-lt-top.png',
      speaker: {
        name: 'User01',
        speaker_id: 'user01',
        image: 'https://github.com/shadcn.png',
      },
    },
  ],
}

export default function WeekSlideList() {
  return (
    <>
      <h3 className="text-foreground mb-4 text-center font-bold">
        「{slideList.title}」
      </h3>
      <div className="text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        {slideList.slides.map((slide, index) => (
          <Link
            href={`/slides/${slideList.id}/${slide.id}`}
            key={index}
            className="flex flex-col gap-2.5 transition-all duration-300 bg-border/50 group hover:bg-black/20 hover:dark:bg-white/20 rounded-md"
          >
            <AspectRatio
              ratio={16 / 9}
              className="overflow-hidden rounded-t-md"
            >
              <Image
                src={slide.image}
                className="object-contain transition-all duration-300 group-hover:scale-105"
                alt="lt thumbnail"
                fill
              />
            </AspectRatio>
            <p className="px-2 text-sm">{slide.title}</p>
            <Link
              href={`/speakers/${slide.speaker.speaker_id}`}
              className="px-2 pb-2.5 flex items-center gap-2 cursor-pointer hover:underline hover:opacity-80"
            >
              <Avatar className="w-6 h-6">
                <AvatarImage src={slide.speaker.image} alt="" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <p className="text-sm">{slide.speaker.name}</p>
            </Link>
          </Link>
        ))}
      </div>
    </>
  )
}
