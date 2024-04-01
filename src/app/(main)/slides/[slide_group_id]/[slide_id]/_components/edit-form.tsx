'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type * as z from 'zod'

import { getSlideGroup, updateSlide } from '@/action/slide'
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
import { Switch } from '@/components/ui/switch'
import { updateSlideSchema } from '@/schemas/slide'
import type { Slide } from '@/types/slide'

export default function SlideEditForm({
  slide,
  slideGroupId,
  setIsOpen,
}: {
  slide: Slide
  slideGroupId: string
  setIsOpen: (isOpen: boolean) => void
}) {
  const [error, setError] = useState<string | undefined>('')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof updateSlideSchema>>({
    resolver: zodResolver(updateSlideSchema),
    defaultValues: {
      id: slide.id,
      title: slide.title,
      is_publish: slide.is_publish,
      drive_pdf_url: slide.drive_pdf_url,
      storage_thumbnail_url: slide.storage_thumbnail_url,
      google_slide_share_url: slide.google_slide_share_url,
      group_id: slideGroupId,
    },
  })

  const onSubmit = (values: z.infer<typeof updateSlideSchema>) => {
    console.log(values)
    startTransition(async () => {
      const result = await updateSlide(values)
      if (!result.isSuccess) {
        setError(result.error.message)
        return
      }

      router.refresh()
      toast.success('スライド情報を更新しました')
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
          name="is_publish"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-end justify-between">
                <div className="flex flex-col gap-2">
                  <FormLabel>
                    公開設定
                    <TypeLabel type="必須" />
                  </FormLabel>
                  <FormDescription className="text-xs">
                    スライドを公開するか選択してください。
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </div>
              <p className="text-red-500 text-xs">
                {form.formState.errors.is_publish?.message}
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="google_slide_share_url"
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
                {form.formState.errors.google_slide_share_url?.message}
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
          更新する
        </Button>
      </form>
    </Form>
  )
}
