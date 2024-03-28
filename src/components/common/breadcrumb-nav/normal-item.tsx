import Link from 'next/link'

import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'

import type { BreadcrumbNavItem } from './types'

export default function NormalItem(item: BreadcrumbNavItem) {
  return (
    <BreadcrumbItem>
      <BreadcrumbLink asChild>
        <Link href={item.url}>{item.label}</Link>
      </BreadcrumbLink>
    </BreadcrumbItem>
  )
}
