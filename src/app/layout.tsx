import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'
import { Toaster } from 'sonner'

import Header from '@/components/common/header'
import Nav from '@/components/common/nav'
import { ThemeProvider } from '@/components/theme/provider'
import FirstSpeakerInfoDialog from '@/components/user/speaker/first_speaker_info_dialog'
import { cn } from '@/lib/utils'
import type { User } from '@/types/user'

import { auth } from '../../auth'

const inter = Inter({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    template: '%s | TECH.C. LTサークル',
    default: 'TECH.C. LTサークル',
  },
  description:
    'TECH.C. LTサークルのWebサイトです。毎週開催しているLTの情報を掲載しています。',
  keywords: ['TECH.C.', 'LT', 'サークル', '技術', '技術共有', '技術交流'],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()
  const user = session?.user

  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="tekceQnk9GVG9WFI2dk8Q7tMaQZTQXcDN7vkjdtLw0c"
        />
      </head>
      <body
        className={cn(notoSansJP.className, inter.className, 'overflow-hidden')}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="theme"
          disableTransitionOnChange
        >
          <Toaster />
          <Header />
          <Nav />
          <FirstSpeakerInfoDialog user={user as User} />
          <main>{children}</main>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
