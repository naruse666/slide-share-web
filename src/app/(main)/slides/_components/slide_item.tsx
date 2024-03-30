import Image from 'next/image'
import Link from 'next/link'

import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import type { Slide } from '@/types/slide'

import { auth } from '../../../../../auth'

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

export default async function SlideItem({
  slide,
  group_id,
}: {
  slide: Slide
  group_id: string
}) {
  const session = await auth()
  const user = session?.user
  if (!slide.is_publish && user?.role !== 'admin') {
    if (slide.speaker_id !== user?.id) {
      return null
    }
  }

  return (
    <Link
      href={`/slides/${group_id}/${slide.id}`}
      className="flex flex-col relative gap-2.5 transition-all duration-300 bg-border/50 group hover:bg-black/20 hover:dark:bg-white/20 rounded-md"
    >
      {user?.role === 'admin' && (
        <Badge
          variant="outline"
          className={`border absolute z-30 top-1 right-1 ${
            slide.is_publish
              ? 'border-green-400 bg-green-400/50'
              : 'border-red-400 bg-red-400/50'
          }`}
        >
          {slide.is_publish ? '公開中' : '非公開'}
        </Badge>
      )}
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
