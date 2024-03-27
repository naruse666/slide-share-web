import * as z from 'zod'

export const setSpeakerInfoSchema = z.object({
  speaker_id: z
    .string()
    .min(1, { message: '発表者IDは必須です' })
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: '発表者IDは半角英数のみ有効です',
    }),
  school: z.string().optional(),
  course: z.string().optional(),
})
