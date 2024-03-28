import Link from 'next/link'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
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
import UserSettings from './user-settings'

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
              <AvatarFallback>{user.display_name![0]}</AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="mb-3 py-2 px-1.5 flex flex-col gap-1">
            <div className="px-2">
              <div className="flex justify-between">
                <p className="text-foreground">{user.display_name}</p>
                {user.role != 'user' && (
                  <Badge>{user.role == 'admin' ? '管理者' : '発表者'}</Badge>
                )}
              </div>
              {user.role != 'user' && (
                <>
                  <p className="text-sm mt-0.5 mb-1">
                    <span className="mr-0.5 text-xs">@</span>
                    {user.speaker_id}
                  </p>
                  <p className="text-sm">
                    {user.school} <span className="mx-0.5 text-xs">/</span>
                    {user.course}
                  </p>
                </>
              )}
              <p className="text-xs mt-1">{user.email}</p>
            </div>
            <div className="mt-2">
              <Separator />
            </div>
            <UserSettings />
            <div className="">
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
