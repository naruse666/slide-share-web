'use client'

import type { LucideIcon } from 'lucide-react'
import { GalleryThumbnails, HomeIcon, MailIcon, Speech } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

const navItems = [
  {
    href: '',
    Icon: HomeIcon,
  },
  {
    href: 'slides?page=1',
    Icon: GalleryThumbnails,
  },
  {
    href: 'speakers',
    Icon: Speech,
  },
  {
    href: 'contacts',
    Icon: MailIcon,
  },
]

export const NavItem = ({
  href,
  Icon,
  isStrong,
}: {
  href: string
  Icon: LucideIcon
  isStrong?: boolean
}) => {
  const pathname = usePathname()
  const isAdmin = pathname.split('/')[1] === 'admin'
  let isActive
  if (isAdmin) {
    isActive = pathname.split(/[/?]/)[2] === href.split(/[/?]/)[1]
  } else {
    if (href.split('/').length <= 1) {
      isActive = false
    }
    isActive = pathname.split(/[/?]/)[1] === href.split(/[/?]/)[0]
  }

  return (
    <Link
      href={'/' + href}
      className={
        cn(
          'w-9 h-9 flex items-center justify-center rounded-full transition-all',
        ) +
        (isActive
          ? ' bg-blue-500/80 text-white'
          : ' text-zinc-500 hover:bg-card/90 hover:text-zinc-400') +
        (isStrong ? ' bg-primary/10 text-primary/70' : '')
      }
    >
      <Icon className="w-5 h-5" />
    </Link>
  )
}

export default function NavItems() {
  return (
    <nav className="flex">
      {navItems.map((item, index) => (
        <NavItem key={index} href={item.href} Icon={item.Icon} />
      ))}
    </nav>
  )
}
