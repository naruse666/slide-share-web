'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type * as z from 'zod'

import { FormError } from '@/components/common/form/form-error'
import TypeLabel from '@/components/common/form/type-label'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { contactSchema } from '@/schemas/contact'
import type { User } from '@/types/user'

export default function ContactFrom({ user }: { user?: User }) {
  const [error, setError] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      message: '',
    },
  })

  const onSubmit = (values: z.infer<typeof contactSchema>) => {
    setError('')
    startTransition(async () => {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        setError('送信に失敗しました')
        return
      }

      console.log('response', response)

      form.reset()
      toast.success('送信に成功しました🎉', {
        duration: 1000,
        description: 'お問い合わせありがとうございます！',
      })
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                名前 <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                お名前を入力してください。
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
                メールアドレス
                <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                メールアドレスを入力してください。
              </FormDescription>
              <FormControl>
                <Input placeholder="your@mail.com" {...field} />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.email?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                メッセージ
                <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                お問い合わせ内容を入力してください。
              </FormDescription>
              <FormControl>
                <Textarea
                  placeholder="お問い合わせ内容を入力してください。"
                  // className="resize-none"
                  {...field}
                />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.message?.message}
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
          送信
        </Button>
      </form>
    </Form>
  )
}
