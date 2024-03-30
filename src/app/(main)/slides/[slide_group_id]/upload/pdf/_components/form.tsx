'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SquareArrowOutUpRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type * as z from 'zod'

import { getSpeakerList, setSpeakerInfo } from '@/action/speaker'
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
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { uploadPDFSchema } from '@/schemas/slide'
import type { User } from '@/types/user'

export default function PDFFrom({
  user,
  slideGroupId,
}: {
  user: User
  slideGroupId: string
}) {
  const [error, setError] = useState<string | undefined>('')
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof uploadPDFSchema>>({
    resolver: zodResolver(uploadPDFSchema),
  })
  const fileRef = form.register('pdf_file')

  const onSubmit = (values: z.infer<typeof uploadPDFSchema>) => {
    console.log(values)
    console.log('pdffile', values.pdf_file[0])
    setError('')
    startTransition(async () => {
      // const speakerList = await getSpeakerList()
      // if (!speakerList.isSuccess) {
      //   setError(speakerList.error.message)
      //   return
      // }
      // const isExist = speakerList.data.some(
      //   (speaker) =>
      //     speaker.speaker_id === values.speaker_id && speaker.id !== user.id,
      // )
      // if (isExist) {
      //   setError('すでに存在する発表者IDです')
      //   return
      // }
      // const result = await setSpeakerInfo(values)
      // if (!result.isSuccess) {
      //   setError(result.error.message)
      //   return
      // }
      // toast.success(result.message)

      toast.success('アップロードしました', {
        action: {
          label: 'スライドを見る',
          onClick: () => router.push(`/slides/${slideGroupId}/${values.id}}`),
        },
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
          name="pdf_file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                PDFファイル <TypeLabel type="必須" />
              </FormLabel>
              <FormDescription className="text-xs">
                アップロードするPDFファイルを選択してください。
              </FormDescription>
              <FormControl>
                <Input type="file" {...fileRef} />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.pdf_file?.message?.toString()}
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
          アップロード
        </Button>
      </form>
    </Form>
  )
}
