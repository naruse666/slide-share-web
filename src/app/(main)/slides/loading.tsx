import CardWrapper from '@/app/_components/card-wrapper'
import LoadingCardWrapper from '@/components/loading/loading-card-wrapper'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

const SlideSkeleton = () => {
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

export default function Loading() {
  const skeletonNum = 4
  const groupNum = 3

  return (
    <article className="pb-24 px-1">
      <CardWrapper title="スライド一覧">
        <Skeleton className="w-10 h-10 mx-auto" />
        <div className="py-6 flex flex-col gap-3">
          {[...Array(groupNum)].map((_, index) => (
            <LoadingCardWrapper key={index}>
              <div className="text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
                {[...Array(skeletonNum)].map((_, index) => (
                  <SlideSkeleton key={index} />
                ))}
              </div>
            </LoadingCardWrapper>
          ))}
        </div>
      </CardWrapper>
    </article>
  )
}
