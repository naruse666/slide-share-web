import BreadcrumbNav from '@/components/common/breadcrumb-nav'
import Header from '@/components/common/header'
import Nav from '@/components/common/nav'
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
      <Nav />
      <ScrollArea className="h-dvh px-4">
        <span className="pt-16 pb-4 block"></span>
        {children}
      </ScrollArea>
    </main>
  )
}
