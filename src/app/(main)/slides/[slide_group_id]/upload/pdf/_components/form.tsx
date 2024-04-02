'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type * as z from 'zod'

import { getSlideGroup, uploadSlideByPDF } from '@/action/slide'
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
  const thumbnailRef = form.register('thumbnail')

  const onSubmit = (values: z.infer<typeof uploadPDFSchema>) => {
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

      const requestValues = {
        id: values.id,
        title: values.title,
        is_publish: false,
        group_id: slideGroupId,
        speaker_id: user.speaker_id,
        drive_id: slideGroup.data.drive_id,
      }

      const formData = new FormData()
      formData.append('pdf', values.pdf_file[0])
      if (values.thumbnail) {
        formData.append('thumbnail', values.thumbnail[0])
      }
      formData.append('data', JSON.stringify(requestValues))

      const result = await uploadSlideByPDF(requestValues, formData)
      if (!result.isSuccess) {
        setError(result.error.message)
        return
      }

      console.log('result', result)

      form.reset()
      router.push(`/slides/${slideGroupId}/${values.id}?status=new`)
      toast.success('アップロードに成功しました🎉')
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
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                サムネイル画像
                <TypeLabel type="任意" />
              </FormLabel>
              <FormDescription className="text-xs">
                サムネイル画像を選択してください。
              </FormDescription>
              <FormControl>
                <Input type="file" {...thumbnailRef} />
              </FormControl>
              <p className="text-red-500 text-xs">
                {form.formState.errors.thumbnail?.message?.toString()}
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
