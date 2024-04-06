import LoadingCardWrapper from '@/components/loading/loading-card-wrapper'

import { SlideSkeleton } from '../_components/slide_item'

export default function Loading() {
  const skeletonNum = 4

  return (
    <LoadingCardWrapper>
      <div className="text-foreground grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5">
        {[...Array(skeletonNum)].map((_, index) => (
          <SlideSkeleton key={index} />
        ))}
      </div>
    </LoadingCardWrapper>
  )
}
