import Nav from '@/components/common/nav'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Home() {
  return (
    <main>
      <ScrollArea className="h-dvh px-4">
        <span className="pt-7 pb-4 block"></span>
        <Nav />
        <p className="font-bold text-lg">dashboard page</p>
      </ScrollArea>
    </main>
  )
}
