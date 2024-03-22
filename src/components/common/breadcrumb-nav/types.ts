import type { LucideIcon } from 'lucide-react'

export type BreadcrumbNavItem = {
  label: string
  url: string
  items?: {
    label: string
    url: string
  }[]
  Icon?: LucideIcon
}
