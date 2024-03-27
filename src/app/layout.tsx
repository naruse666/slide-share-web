import './globals.css'

import type { Metadata } from 'next'
import { Inter, Noto_Sans_JP } from 'next/font/google'

import Header from '@/components/common/header'
import { ThemeProvider } from '@/components/theme/provider'
import { Toaster } from '@/components/ui/sonner'
import SpeakerInfoDialog from '@/components/user/speaker_info'
import { cn } from '@/lib/utils'

import { auth } from '../../auth'

const inter = Inter({ subsets: ['latin'] })
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LT Slide Share',
  description: 'LT Slide Share',
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
          <SpeakerInfoDialog role={user?.role} speaker_id={user?.speaker_id} />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
