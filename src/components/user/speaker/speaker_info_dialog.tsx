'use client'

import { AlertDialogCancel } from '@radix-ui/react-alert-dialog'
import { UserRound } from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { User } from '@/types/user'

import { ScrollArea } from '../../ui/scroll-area'
import SpeakerInfoForm from './speaker_info_form'

export default function SpeakerInfoDialog({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState(false)

  if (!user || user.role === 'user') return null
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger>
        <button
          className="text-sm w-full flex gap-1 justify-start items-center my-0.5 p-1.5 rounded transition-colors hover:text-foreground hover:bg-black/10 hover:dark:bg-white/10"
          onClick={() => setIsOpen(true)}
        >
          <UserRound className="w-5 h-5" />
          発表者情報を変更
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <ScrollArea className="max-h-dvh">
          <AlertDialogHeader>
            <AlertDialogTitle>発表者情報を設定</AlertDialogTitle>
            <AlertDialogDescription className="px-1">
              <SpeakerInfoForm user={user} setIsOpen={setIsOpen} />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </ScrollArea>
        <AlertDialogFooter>
          <div className="w-full flex justify-center">
            <AlertDialogCancel
              onClick={() => {
                setIsOpen(false)
              }}
              className="border-0 flex gap-1 items-center pl-0 transition-opacity text-sm hover:opacity-80"
            >
              やめる
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
