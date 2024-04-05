'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type * as z from 'zod'

import { getSpeakerList } from '@/action/speaker'
import { updateUser } from '@/action/user'
import { FormError } from '@/components/common/form/form-error'
import TypeLabel from '@/components/common/form/type-label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateUserSchema } from '@/schemas/user'
import type { User } from '@/types/user'

export default function EditUserForm({ user }: { user: User }) {
  const router = useRouter()

  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof updateUserSchema>>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      image: user?.image,
      display_name: user?.display_name,
      role: user?.role,
      speaker_id: user?.speaker_id,
      school: user?.school,
      course: user?.course,
      is_top_display: user?.is_top_display,
    },
  })

  const onSubmit = (values: z.infer<typeof updateUserSchema>) => {
    setError('')
    startTransition(async () => {
      const speakerList = await getSpeakerList()
      if (!speakerList.isSuccess) {
        setError(speakerList.error.message)
        return
      }

      const isExist = speakerList.data.some(
        (speaker) =>
          speaker.speaker_id === values.speaker_id &&
          values.speaker_id !== user.speaker_id,
      )
      if (isExist) {
        setError('すでに存在する発表者IDです')
        return
      }

      const result = await updateUser(values)
      if (!result.isSuccess) {
        setError(result.error.message)
        return
      }
      toast.success(result.message)
      router.push('/users')
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5 text-foreground max-w-2xl mx-auto"
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
                {form.formState.errors.name?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                メールアドレス <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                一般に公開されません。
              </FormDescription>
              <FormControl>
                <Input placeholder="名前" {...field} />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.email?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                アイコンURL <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                一般に公開されます。
              </FormDescription>
              <FormControl>
                <Input placeholder="名前" {...field} />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.image?.message}
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
                {form.formState.errors.display_name?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                権限
                <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                発表者・管理者 は発表者一覧に表示されます。
              </FormDescription>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="user">一般ユーザー</SelectItem>
                  <SelectItem value="speaker">発表者</SelectItem>
                  <SelectItem value="admin">管理者</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-red-500 text-xs">
                {form.formState.errors.role?.message}
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
        <FormField
          control={form.control}
          name="is_top_display"
          render={({ field }) => (
            <FormItem>
              <FormLabel>トップ表示</FormLabel>
              <FormDescription className="text-xs">
                トップページに表示されます。
              </FormDescription>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
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
          変更する
        </Button>
        <Link
          href="/users"
          className="flex items-center justify-center gap-1.5 text-sm group text-foreground mr-4"
        >
          <ArrowLeft className="w-4 h-4 transition duration-300 group-hover:-translate-x-1" />
          やめる
        </Link>
      </form>
    </Form>
  )
}
