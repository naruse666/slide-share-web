'use client'

import { ArrowLeft, UserRound } from 'lucide-react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

export default function UserSettings() {
  const handleSave = () => {
    console.log('save')
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full">
        <button className="text-sm w-full flex gap-1 justify-start items-center my-0.5 p-1.5 rounded transition-colors hover:text-foreground hover:bg-black/10 hover:dark:bg-white/10">
          <UserRound className="w-5 h-5" />
          ユーザー情報を変更
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ユーザー情報を変更</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="w-full flex justify-between">
            <AlertDialogCancel className="border-0 flex gap-1 items-center pl-0 transition-opacity hover:opacity-80">
              <ArrowLeft className="w-5 h-5" />
              やめる
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleSave()
              }}
              className="tracking-wider font-bold"
            >
              保存
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
