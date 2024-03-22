import BreadcrumbNav from '@/components/common/breadcrumb-nav'
import Header from '@/components/common/header'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="h-dvh overflow-hidden">
      <Header />
      <BreadcrumbNav />
      <ScrollArea className="h-dvh px-4 pb-4">
        <span className="pt-16 block"></span>
        {children}
      </ScrollArea>
    </main>
  )
}
