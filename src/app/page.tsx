import { ThemeToggle } from '@/components/theme/toggle'

export default function Home() {
  return (
    <main className="h-screen p-10 flex flex-col space-y-3">
      <div className="bg-background text-foreground p-10 border rounded-md shadow">
        <p>background</p>
      </div>
      <div className="bg-primary text-primary-foreground p-10 border rounded-md shadow">
        <p>primary</p>
      </div>
      <div className="bg-card text-card-foreground p-10 border rounded-md shadow">
        <p>card</p>
      </div>
      <div className="bg-popover text-popover-foreground p-10 border rounded-md shadow dark:shadow-black border-l-0">
        <p>popover</p>
      </div>
      <div className="rounded-xl p-6 lg:p-8 before:pointer-events-none before:absolute before:-inset-px before:rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.05),0px_2px_2px_0px_rgba(9,9,11,0.08)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.80),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] lg:col-span-3">
        <p>test</p>
      </div>
      <div className="rounded-xl p-6 shadow bg-card border dark:shadow-black">
        <p>shadow</p>
      </div>
      <div className="h-36 w-full shadow-md rounded-md bg-gradient-to-b from-border from-10% via-card via-50% to-border to-90% p-[1px]">
        <div className="flex h-full w-full items-center rounded-md justify-center bg-card back">
          <h1 className="text-2xl font-black text-white">
            the quick brown fox jumps over the lazy dog
          </h1>
        </div>
      </div>
      <ThemeToggle />
    </main>
  )
}
