import LoadingCardWrapper from '@/components/loading/loading-card-wrapper'
import { Skeleton } from '@/components/ui/skeleton'

import { SlideSkeleton } from '../../slides/_components/loading/slide-skelton'

export default function Loading() {
  const skeletonNum = 4

  return (
    <LoadingCardWrapper description={false}>
      <div className="flex flex-wrap justify-between font-semibold">
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full" />
          <Skeleton className="w-20 h-5" />
        </div>
        <Skeleton className="w-24 h-5" />
      </div>
      <Skeleton className="ml-auto mr-0 mt-4 w-20 h-6" />
      <div className="mt-3 text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        {Array.from({ length: skeletonNum }).map((_, index) => (
          <SlideSkeleton key={index} />
        ))}
      </div>
    </LoadingCardWrapper>
  )
}
