'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type * as z from 'zod'

import { getSlideGroups, updateSlideGroup } from '@/action/slide'
import { FormError } from '@/components/common/form/form-error'
import TypeLabel from '@/components/common/form/type-label'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { createSlideGroupSchema } from '@/schemas/slide'
import type { SlideGroup } from '@/types/slide'
import type { User } from '@/types/user'

export default function GroupEditForm({
  user,
  slideGroup,
  setIsOpen,
}: {
  user: User
  slideGroup: SlideGroup
  setIsOpen: (isOpen: boolean) => void
}) {
  const [error, setError] = useState<string | undefined>('')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof createSlideGroupSchema>>({
    resolver: zodResolver(createSlideGroupSchema),
    defaultValues: {
      id: slideGroup.id,
      title: slideGroup.title,
      presentation_at: new Date(slideGroup.presentation_at),
    },
  })

  const onSubmit = (values: z.infer<typeof createSlideGroupSchema>) => {
    setError('')
    startTransition(async () => {
      if (user.role !== 'admin') {
        setError('権限がありません')
        return
      }
      const slideGroups = await getSlideGroups()
      if (!slideGroups.isSuccess) {
        setError(slideGroups.error.message)
        return
      }

      const isExist =
        slideGroups.data &&
        slideGroups.data.some(
          (sg) => sg === values.id && slideGroup.id !== slideGroup.id,
        )

      if (isExist) {
        setError('すでに存在するグループIDです')
        return
      }

      const result = await updateSlideGroup(values)
      if (!result.isSuccess) {
        setError(result.error.message)
        return
      }

      form.reset()
      toast.success('グループを更新しました')
      setIsOpen(false)
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 text-foreground"
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                スライドID <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                半角英数のみ有効です。
              </FormDescription>
              <FormControl>
                <Input placeholder="title" {...field} />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.id?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                タイトル
                <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                スライドのタイトルを入力してください。
              </FormDescription>
              <FormControl>
                <Input placeholder="タイトル" {...field} />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.title?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="presentation_at"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                発表日
                <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                発表日を入力してください。
              </FormDescription>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground',
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'yyyy/MM/dd')
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <p className="text-red-500 text-xs">
                {form.formState.errors.presentation_at?.message}
              </p>
            </FormItem>
          )}
        />
        <FormError message={error} />
        <Button
          type="submit"
          disabled={isPending}
          className="w-full font-bold tracking-wider"
        >
          {isPending && <Loader className="w-5 h-5 mr-2 animate-spin" />}
          更新する
        </Button>
      </form>
    </Form>
  )
}
