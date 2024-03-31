import { ArrowUpRight, Copy, MoreHorizontal, UserRoundCog } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import type { User } from '@/types/user'

export default function ActionMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            navigator.clipboard.writeText(user.id)
            toast.info('ユーザーID をコピーしました')
          }}
        >
          <Copy className="w-4 h-4 mt-0.5" />
          ユーザーID をコピー
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => {
            toast.error('この機能はまだ実装されていません🙇')
          }}
        >
          <UserRoundCog className="w-4 h-4" />
          ユーザー情報 を編集
        </DropdownMenuItem>
        <div className="px-1 my-1.5">
          <Separator />
        </div>
        {user.speaker_id && (
          <DropdownMenuItem>
            <Link
              href={`/speakers/${user.speaker_id}`}
              className="flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" />
              発表者ページ を見る
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <a
            href={`https://console.firebase.google.com/u/0/project/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/firestore/data/~2Fusers~2F${user.id}?hl=ja`}
            target="_blank"
            className="flex items-center gap-2"
          >
            <ArrowUpRight className="w-4 h-4" />
            Firestore を開く
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
