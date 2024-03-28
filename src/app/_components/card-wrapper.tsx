import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { Card } from '@/components/ui/card'

export default function CardWrapper({
  title,
  description,
  link,
  children,
}: {
  title: string
  description?: string
  link?: {
    href: string
    text: string
  }
  children: React.ReactNode
}) {
  return (
    <Card className="p-5">
      <div>
        {!link ? (
          <h2 className="text-sm font-semibold mb-5 text-foreground tracking-wider">
            {title}
          </h2>
        ) : (
          <div className="flex justify-between text-foreground items-center mb-5 text-sm">
            <h2 className="font-semibold tracking-wider">{title}</h2>
            <Link
              href={link.href}
              className=" flex gap-0.5 items-center group transition-opacity duration-300 hover:opacity-80"
            >
              {link.text}
              <ArrowRight className="w-5 h-5 transition-translation duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        )}
        {description && <h3 className="text-xs -mt-2 mb-5">{description}</h3>}
        {children}
      </div>
    </Card>
  )
}
