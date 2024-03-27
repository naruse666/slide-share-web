'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type * as z from 'zod'

import { setSpeakerInfo } from '@/action/user'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { setSpeakerInfoSchema } from '@/schemas/user'

import { FormError } from '../common/form/form-error'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../ui/form'
import { Input } from '../ui/input'

export default function SpeakerInfoDialog({
  role,
  speaker_id,
}: {
  role?: string
  speaker_id?: string
}) {
  const [isOpen, setIsOpen] = useState(true)
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof setSpeakerInfoSchema>>({
    resolver: zodResolver(setSpeakerInfoSchema),
    defaultValues: {
      speaker_id: '',
      school: '',
      course: '',
    },
  })

  if (!role) return null
  if (role != 'user' && !speaker_id) {
    const onSubmit = (values: z.infer<typeof setSpeakerInfoSchema>) => {
      setError('')
      startTransition(async () => {
        const result = await setSpeakerInfo(values)
        if (!result.isSuccess) {
          setError(result.error.message)
          return
        }
        setIsOpen(false)
        toast.success(result.message)
      })
    }

    return (
      <AlertDialog open={isOpen}>
        <AlertDialogTrigger></AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>発表者情報を設定</AlertDialogTitle>
            <AlertDialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 text-foreground"
                >
                  <FormField
                    control={form.control}
                    name="speaker_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>発表者ID</FormLabel>
                        <FormDescription className="text-xs">
                          発表者IDは必須です。一般に公開されます。半角英数のみ有効です。
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="name" {...field} />
                        </FormControl>
                        <p className="text-red-500 text-xs">
                          {form.formState.errors.speaker_id?.message}
                        </p>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>学校</FormLabel>
                        <FormDescription className="text-xs">
                          発表者IDは任意です。一般に公開されます。
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="東京校" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>専攻</FormLabel>
                        <FormDescription className="text-xs">
                          専攻は任意です。一般に公開されます。
                        </FormDescription>
                        <FormControl>
                          <Input placeholder="IT科" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormError message={error} />
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full font-bold tracking-wider"
                  >
                    保存
                  </Button>
                </form>
              </Form>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
}
