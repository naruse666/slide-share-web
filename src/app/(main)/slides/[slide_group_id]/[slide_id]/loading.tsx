import LoadingCardWrapper from '@/components/loading/loading-card-wrapper'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <LoadingCardWrapper description={false}>
      <div className="flex gap-2 mt-7 mb-4 items-center">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-6 w-20" />
      </div>
      <div className="grid place-items-center border shadow-md bg-[#212121] dark:bg-[#313131] rounded-md py-3">
        <Skeleton className="w-full max-w-[920px] aspect-video" />
      </div>
    </LoadingCardWrapper>
  )
}
