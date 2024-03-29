import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import type { Slide } from '@/types/slide'

export const SlideSkeleton = () => (
  <div className="bg-border/50 flex flex-col gap-2.5 rounded-md">
    <Skeleton className="w-full aspect-video rounded-b-none" />
    <div className="px-2">
      <Skeleton className="w-[130px] h-[25px] max-w-full" />
    </div>
    <div className="px-2 pb-2.5 flex items-center gap-2">
      <Skeleton className="w-6 h-6 rounded-full" />
      <Skeleton className="w-[70px] h-[20px]" />
    </div>
  </div>
)

export default function SlideItem({
  slide,
  group_id,
}: {
  slide: Slide
  group_id: string
}) {
  return (
    <Link
      href={`/slides/${group_id}/${slide.id}`}
      className="flex flex-col flew gap-2.5 transition-all duration-300 bg-border/50 group hover:bg-black/20 hover:dark:bg-white/20 rounded-md"
    >
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-t-md">
        <Image
          src={slide.storage_thumbnail_url}
          className="object-contain transition-all duration-300 group-hover:scale-105"
          alt="lt thumbnail"
          fill
        />
      </AspectRatio>
      <p className="px-2 text-sm">{slide.title}</p>
      <div className="px-2 pb-2.5 flex items-center gap-2">
        <Avatar className="w-6 h-6">
          <AvatarImage src={slide.speaker_image} alt="speaker image" />
          <AvatarFallback>{slide.speaker_name[0]}</AvatarFallback>
        </Avatar>
        <p className="text-sm">{slide.speaker_name}</p>
      </div>
    </Link>
  )
}
