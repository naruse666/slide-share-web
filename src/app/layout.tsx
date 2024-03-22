import './globals.css'

import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'

import { ThemeProvider } from '@/components/theme/provider'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LT Slide Share',
  description: 'LT Slide Share',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={cn(notoSansJP.className, inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
