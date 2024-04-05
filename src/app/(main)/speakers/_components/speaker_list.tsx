import Link from 'next/link'

import { getSpeakerList } from '@/action/speaker'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'

const SpeakerSkeleton = () => (
  <div className="flex gap-2 p-2">
    <Skeleton className="w-[40px] h-[40px] rounded-full" />
    <div className="flex flex-col gap-1 py-1">
      <Skeleton className="w-[70px] h-[17px] rounded-md" />
      <Skeleton className="w-[130px] h-[13px] rounded-md" />
    </div>
  </div>
)

export async function SpeakerList({ isTop }: { isTop?: boolean }) {
  const speakers = await getSpeakerList()
  const skeltonNum = 10

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
      {speakers.data ? (
        <>
          {speakers.data.map((speaker, index) => {
            if (!speaker.is_top_display && isTop) return null
            return (
              <Link
                key={speaker.speaker_id}
                href={`/speakers/${speaker.speaker_id}`}
                className="flex gap-2 transition-all duration-300 cursor-pointer hover:bg-black/10 hover:dark:bg-white/10 rounded-md p-2"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={speaker.image}
                    alt={`@${speaker.display_name}`}
                  />
                  <AvatarFallback className="border">
                    {speaker.display_name[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold text-foreground text-sm">
                    {speaker.display_name}
                  </h3>
                  <p className="text-xs">
                    {speaker.school}
                    {speaker.school && speaker.course && (
                      <span className="mx-0.5 text-xs">/</span>
                    )}
                    {speaker.course}
                  </p>
                </div>
              </Link>
            )
          })}
        </>
      ) : (
        Array.from({ length: skeltonNum }).map((_, index) => (
          <SpeakerSkeleton key={index} />
        ))
      )}
    </div>
  )
}
