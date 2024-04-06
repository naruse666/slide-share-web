import * as z from 'zod'

export const setSpeakerInfoSchema = z.object({
  name: z.string().min(1, { message: '名前は必須です' }),
  display_name: z.string().min(1, { message: '表示名は必須です' }),
  speaker_id: z
    .string()
    .min(1, { message: '発表者IDは必須です' })
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: '発表者IDは半角英数のみ有効です',
    }),
  school: z.string().optional(),
  course: z.string().optional(),
  created_at: z.date().optional(),
})

export const updateUserSchema = z.object({
  id: z.string().min(1, { message: 'IDは必須です' }),
  name: z.string().min(1, { message: '名前は必須です' }),
  image: z.string().min(1, { message: '画像は必須です' }),
  email: z
    .string()
    .email({ message: 'メールアドレスの形式が正しくありません' }),
  role: z.enum(['user', 'speaker', 'admin']),
  speaker_id: z
    .string()
    .optional()
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value ?? ''), {
      message: '発表者IDは半角英数のみ有効です',
    }),
  display_name: z.string().optional(),
  school: z.string().optional(),
  course: z.string().optional(),
  is_top_display: z.boolean().optional(),
  created_at: z.date().optional(),
})
