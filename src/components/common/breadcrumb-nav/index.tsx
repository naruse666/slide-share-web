'use client'

import { HomeIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'

import { Breadcrumb, BreadcrumbList } from '@/components/ui/breadcrumb'
import { urlParser } from '@/utils/url-parser'

import DropDownItem from './drop-down-item'
import NormalItem from './normal-item'
import Separator from './separator'

export default function BreadcrumbNav() {
  const pathname = usePathname()
  const navItems = urlParser(pathname)

  navItems.unshift({
    label: 'ダッシュボード',
    url: '/',
    Icon: HomeIcon,
    items: [
      {
        label: 'スライド',
        url: '/slides',
      },
      {
        label: '発表者',
        url: '/speakers',
      },
      {
        label: 'お問い合わせ',
        url: '/contacts',
      },
      {
        label: '設定',
        url: '/settings',
      },
    ],
  })

  return (
    <Breadcrumb className="fixed z-20 top-8 left-0 w-full py-2 px-4">
      <BreadcrumbList>
        {navItems.map((item, index) => {
          if ('items' in item) {
            if (index !== navItems.length - 1) {
              return (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                  <div>
                    <DropDownItem key={index} {...item} />
                  </div>
                  <Separator />
                </div>
              )
            }
            return <DropDownItem key={index} {...item} />
          } else {
            if (index !== navItems.length - 1) {
              return (
                <div
                  key={index}
                  className="flex items-center justify-start gap-2"
                >
                  <div>
                    <NormalItem key={index} {...item} />
                  </div>
                  <Separator />
                </div>
              )
            }
            return <NormalItem key={index} {...item} />
          }
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
