'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type * as z from 'zod'

import { getSpeakerList, setSpeakerInfo } from '@/action/speaker'
import { setSpeakerInfoSchema } from '@/schemas/user'
import type { User } from '@/types/user'

import { FormError } from '../../common/form/form-error'
import TypeLabel from '../../common/form/type-label'
import { Button } from '../../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '../../ui/form'
import { Input } from '../../ui/input'

export default function SpeakerInfoForm({
  user,
  setIsOpen,
}: {
  user: User
  setIsOpen: (isOpen: boolean) => void
}) {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof setSpeakerInfoSchema>>({
    resolver: zodResolver(setSpeakerInfoSchema),
    defaultValues: {
      name: user?.name,
      display_name: user?.display_name,
      speaker_id: user?.speaker_id,
      school: user?.school,
      course: user?.course,
    },
  })

  const onSubmit = (values: z.infer<typeof setSpeakerInfoSchema>) => {
    setError('')
    startTransition(async () => {
      const speakerList = await getSpeakerList()
      if (!speakerList.isSuccess) {
        setError(speakerList.error.message)
        return
      }

      const isExist = speakerList.data.some(
        (speaker) =>
          speaker.speaker_id === values.speaker_id && speaker.id !== user.id,
      )
      if (isExist) {
        setError('すでに存在する発表者IDです')
        return
      }

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 text-foreground"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                名前 <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                一般に公開されません。
              </FormDescription>
              <FormControl>
                <Input placeholder="名前" {...field} />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.speaker_id?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="display_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                表示名
                <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                一般に公開されます。
              </FormDescription>
              <FormControl>
                <Input placeholder="ニックネーム" {...field} />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.speaker_id?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speaker_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                発表者ID
                <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                一般に公開されます。半角英数のみ有効です。
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
              <FormLabel>
                学校
                <TypeLabel type="任意" />
              </FormLabel>
              <FormDescription className="text-xs">
                一般に公開されます。
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
              <FormLabel>
                専攻
                <TypeLabel type="任意" />
              </FormLabel>
              <FormDescription className="text-xs">
                一般に公開されます。
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
  )
}
