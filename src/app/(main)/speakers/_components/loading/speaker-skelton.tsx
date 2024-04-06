import { Skeleton } from '@/components/ui/skeleton'

export const SpeakerSkeleton = () => {
  return (
    <div className="flex gap-2 p-2">
      <Skeleton className="w-10 h-10 rounded-full" />
      <div className="flex flex-col gap-1">
        <Skeleton className="w-24 h-5 rounded-md" />
        <Skeleton className="w-32 h-3 rounded-md" />
      </div>
    </div>
  )
}
