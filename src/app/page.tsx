import Nav from '@/components/common/nav'
import { ScrollArea } from '@/components/ui/scroll-area'

import { auth } from '../../auth'

export default async function Home() {
  const session = await auth()
  return (
    <main>
      <ScrollArea className="h-dvh px-4">
        <span className="pt-7 pb-4 block"></span>
        <Nav />
        <p className="font-bold text-lg">dashboard page</p>
        <p>{session?.user.name}</p>
        <p>{session?.user.role}</p>
      </ScrollArea>
    </main>
  )
}
