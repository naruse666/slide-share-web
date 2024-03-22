import { ChevronDownIcon } from 'lucide-react'
import Link from 'next/link'

import { BreadcrumbItem, BreadcrumbLink } from '@/components/ui/breadcrumb'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import type { BreadcrumbNavItem } from './types'

export default function DropDownItem(dropDownItem: BreadcrumbNavItem) {
  return (
    <BreadcrumbItem>
      <DropdownMenu>
        {dropDownItem.Icon && (
          <Link href={dropDownItem.url}>
            <dropDownItem.Icon className="h-4 w-4" />
          </Link>
        )}
        <DropdownMenuTrigger className="flex items-center gap-1">
          {dropDownItem.label}
          <ChevronDownIcon className="h-4 w-4" />
        </DropdownMenuTrigger>
        {dropDownItem.items && (
          <DropdownMenuContent align="start">
            {dropDownItem.items.map((item) => (
              <DropdownMenuItem key={item.url}>
                <BreadcrumbLink href={item.url} className="w-full">
                  {item.label}
                </BreadcrumbLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </BreadcrumbItem>
  )
}
