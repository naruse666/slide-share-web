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
        cn('w-8 h-8 flex items-center justify-center rounded-full') +
        (isActive ? ' bg-blue-500/80 text-white' : ' text-zinc-500')
      }
    >
      <Icon className="w-5 h-5" />
    </Link>
  )
}
