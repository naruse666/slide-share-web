'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader, SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type * as z from 'zod'

import { getSlideGroup, uploadSlideByGoogleSlidesURL } from '@/action/slide'
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
import { uploadSlidesSchema } from '@/schemas/slide'
import type { User } from '@/types/user'

export default function GoogleSlidesURLFrom({
  user,
  slideGroupId,
}: {
  user: User
  slideGroupId: string
}) {
  const [error, setError] = useState<string | undefined>('')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof uploadSlidesSchema>>({
    resolver: zodResolver(uploadSlidesSchema),
    defaultValues: {
      id: '',
      title: '',
      slides_url: '',
      slides_share_url: '',
    },
  })

  const onSubmit = (values: z.infer<typeof uploadSlidesSchema>) => {
    setError('')
    startTransition(async () => {
      if (user.role === 'user') {
        setError('権限がありません')
        return
      }

      const slideGroup = await getSlideGroup(slideGroupId)
      if (!slideGroup.isSuccess) {
        setError(slideGroup.error.message)
        return
      }

      if (!slideGroup.data) {
        setError('スライドグループが見つかりません')
        return
      }
      const isExist =
        slideGroup.data.slide_list &&
        slideGroup.data.slide_list.some((slide) => slide.id === values.id)
      if (isExist) {
        setError('すでに登録されているスライドIDです')
        return
      }

      const result = await uploadSlideByGoogleSlidesURL(
        values,
        slideGroupId,
        slideGroup.data.drive_id,
      )
      if (!result.isSuccess) {
        setError(result.error.message)
        return
      }

      form.reset()
      router.push(`/slides/${slideGroupId}/${values.id}`)
      toast.success('アップロードしました')
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
          name="slides_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Google Slides URL
                <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                Google SlidesのURLを入力してください。
                <a
                  target="_blank"
                  className="text-primary inline-flex items-center gap-1 hover:underline"
                  href="https://chlorinated-skateboard-53e.notion.site/Google-Slides-URL-8055286246164b2585be382e93eb3c9d?pvs=4"
                >
                  URL の取得方法
                  <SquareArrowOutUpRight className="w-3 h-3" />
                </a>
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="https://docs.google.com/presentation/d/xxx"
                  {...field}
                />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.slides_url?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slides_share_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Google Slides 公開URL
                <TypeLabel type="任意" />
              </FormLabel>
              <FormDescription className="text-xs">
                Google Slidesの公開URLを入力してください。
                <a
                  target="_blank"
                  className="text-primary inline-flex items-center gap-1 hover:underline"
                  href="https://chlorinated-skateboard-53e.notion.site/Google-Slides-URL-24f7fa2a0bde47ff97d38bca305112b0?pvs=4"
                >
                  公開URL の取得方法
                  <SquareArrowOutUpRight className="w-3 h-3" />
                </a>
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="https://docs.google.com/presentation/d/e/xxx/pub?..."
                  {...field}
                />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.slides_share_url?.message}
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
          アップロード
        </Button>
      </form>
    </Form>
  )
}
