import { Skeleton } from '@/components/ui/skeleton'

export const SlideSkeleton = () => {
  return (
    <div className="flex flex-col relative gap-2.5 transition-all duration-300 bg-border/50 group hover:bg-black/20 hover:dark:bg-white/20 rounded-md">
      <Skeleton className="aspect-video" />
      <div className="px-1.5 flex flex-col gap-2.5">
        <Skeleton className="h-5 w-2/3" />
        <div className="flex gap-1 items-center pb-3">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-1/3 " />
        </div>
      </div>
    </div>
  )
}
