'use client'

import type { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

export default function NavItem({
  href,
  Icon,
}: {
  href: string
  Icon: LucideIcon
}) {
  const pathname = usePathname()
  const isActive = pathname.split('/')[1] === href

  return (
    <Link
      href={'/' + href}
      className={
        cn(
          'w-9 h-9 flex items-center justify-center rounded-full transition-all',
        ) +
        (isActive
          ? ' bg-blue-500/80 text-white'
          : ' text-zinc-500 hover:bg-card/90 hover:text-zinc-400')
      }
    >
      <Icon className="w-5 h-5" />
    </Link>
  )
}
