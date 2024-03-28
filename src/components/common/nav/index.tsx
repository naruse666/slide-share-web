import NavItems from './items'
import UserButton from './user-button'

export default async function Nav() {
  return (
    <div className="fixed z-30 bottom-6 right-1/2 translate-x-1/2 h-13 bg-white/70 dark:bg-zinc-950/70 backdrop-blur border p-2 rounded-full shadow dark:shadow-black flex sh gap-1.5">
      <NavItems />
      <div className="border-r my-2 rounded-md"></div>
      <UserButton />
    </div>
  )
}
