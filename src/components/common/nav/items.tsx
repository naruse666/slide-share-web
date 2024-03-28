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

function NavItem({ href, Icon }: { href: string; Icon: LucideIcon }) {
  const pathname = usePathname()
  const isActive = pathname.split(/[/?]/)[1] === href.split(/[/?]/)[0]

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

export default function NavItems() {
  return (
    <nav className="flex">
      {navItems.map((item, index) => (
        <NavItem key={index} href={item.href} Icon={item.Icon} />
      ))}
    </nav>
  )
}
