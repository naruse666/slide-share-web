'use client'

import { ArrowLeft, FolderPen } from 'lucide-react'
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
import { Button } from '@/components/ui/button'
import type { SlideGroup } from '@/types/slide'
import type { User } from '@/types/user'

import GroupEditForm from './edit-form'

export default function GroupEdit({
  user,
  slideGroup,
}: {
  user: User
  slideGroup: SlideGroup
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger>
        <Button
          variant="outline"
          className="flex gap-2"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          グループを編集する
          <FolderPen />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            <GroupEditForm
              user={user}
              slideGroup={slideGroup}
              setIsOpen={setIsOpen}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center w-full">
            <button
              className="flex justify-center items-center gap-1 text-sm group mr-4"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <ArrowLeft className="h-4 w-4 transition duration-300 group-hover:-translate-x-1" />
              やめる
            </button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
