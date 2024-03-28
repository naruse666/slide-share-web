'use client'

import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import type { User } from '@/types/user'

import { ScrollArea } from '../../ui/scroll-area'
import SpeakerInfoForm from './speaker_info_form'

export default function FirstSpeakerInfoDialog({
  user,
}: {
  user: User | null
}) {
  const [isOpen, setIsOpen] = useState(true)

  if (!user || user.role === 'user') return null
  if (!user.speaker_id) {
    return (
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <ScrollArea className="max-h-dvh">
            <AlertDialogHeader>
              <AlertDialogTitle>発表者情報を設定</AlertDialogTitle>
              <AlertDialogDescription className="px-1">
                <SpeakerInfoForm user={user} setIsOpen={setIsOpen} />
              </AlertDialogDescription>
            </AlertDialogHeader>
          </ScrollArea>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
}
