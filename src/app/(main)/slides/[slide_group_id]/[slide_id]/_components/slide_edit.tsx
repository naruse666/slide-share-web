'use client'

import { ArrowLeft, FilePen } from 'lucide-react'
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
import type { Slide } from '@/types/slide'

import SlideEditForm from './edit-form'

export default function SlideEdit({
  slide,
  slideGroupId,
}: {
  slide: Slide
  slideGroupId: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger>
        <Button
          className="flex gap-2"
          onClick={() => {
            setIsOpen(true)
          }}
        >
          スライド情報を編集する
          <FilePen />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="mb-3">
            スライド情報を編集する
          </AlertDialogTitle>
          <AlertDialogDescription>
            <SlideEditForm
              slide={slide}
              slideGroupId={slideGroupId}
              setIsOpen={setIsOpen}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <div className="flex justify-center w-full">
            <button
              className="flex gap-1 transition-opacity hover:opacity-80"
              onClick={() => {
                setIsOpen(false)
              }}
            >
              <ArrowLeft />
              やめる
            </button>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
