'use client'

import { UsersRound } from 'lucide-react'

import { NavItem } from './items'

const navItems = [
  {
    href: 'users',
    Icon: UsersRound,
  },
]

export default function AdminItems() {
  return (
    <nav className="flex">
      {navItems.map((item, index) => (
        <NavItem key={index} href={item.href} Icon={item.Icon} />
      ))}
    </nav>
  )
}
