import { Card } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function LoadingCardWrapper({
  children,
  description = true,
}: {
  children: React.ReactNode
  description?: boolean
}) {
  return (
    <Card className="p-5">
      <div>
        <div className="flex flex-wrap gap-3 justify-between text-foreground items-center mb-3 text-sm">
          <Skeleton className="h-5 w-48" />
          <Skeleton className="h-5 w-44" />
        </div>
        {description && <Skeleton className="h-4 w-32 mb-3" />}
        {children}
      </div>
    </Card>
  )
}
