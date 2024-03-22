'use client'

import { GalleryThumbnails, HomeIcon, MailIcon, Speech } from 'lucide-react'
import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import NavItem from './item'

const navItems = [
  {
    href: '',
    Icon: HomeIcon,
  },
  {
    href: 'slides',
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

export default function Nav() {
  const user = true

  return (
    <nav className="fixed z-30 bottom-6 right-1/2 translate-x-1/2 h-13 pl-2.5 bg-white dark:bg-zinc-950 border p-2 rounded-full shadow dark:shadow-black flex sh gap-1.5">
      {navItems.map((item, index) => (
        <NavItem key={index} href={item.href} Icon={item.Icon} />
      ))}
      <div className="border-r"></div>
      {user ? (
        <Avatar className="w-9 h-9 ml-1">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      ) : (
        <Link
          href="/auth"
          className={cn(buttonVariants(), 'rounded-full h-9 ml-1')}
        >
          ログイン
        </Link>
      )}
    </nav>
  )
}
