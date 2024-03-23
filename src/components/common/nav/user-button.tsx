import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { buttonVariants } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

import { auth } from '../../../../auth'
import SignOutButton from './sign-out-button'

export default async function UserButton() {
  const session = await auth()
  const user = session?.user

  return (
    <div>
      {user ? (
        <Popover>
          <PopoverTrigger className="">
            <Avatar className="w-9 h-9 ml-1">
              <AvatarImage src={user.image!} />
              <AvatarFallback>{user.name![0]}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mb-3  p-1.5 flex flex-col gap-1">
            <p className="px-2 text-foreground">{user.name}</p>
            <p className="px-2 text-xs">{user.email}</p>
            <div className="mt-2">
              <Separator />
            </div>
            <SignOutButton />
          </PopoverContent>
        </Popover>
      ) : (
        <Link
          href="/auth"
          className={cn(buttonVariants(), 'rounded-full h-9 ml-1')}
        >
          ログイン
        </Link>
      )}
    </div>
  )
}
