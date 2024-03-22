import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'

import type { BreadcrumbNavItem } from './types'

export default function NormalItem(item: BreadcrumbNavItem) {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink href={item.url}>{item.label}</BreadcrumbLink>
    </BreadcrumbItem>
  )
}
