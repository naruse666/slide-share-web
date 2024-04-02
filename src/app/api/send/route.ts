import { Resend } from 'resend'

import { EmailTemplate } from '@/components/contact/email-template'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request): Promise<Response> {
  const body = await req.json()
  const { name, email, message } = body

  try {
    const data = await resend.emails.send({
      from: 'Slide Share <onboarding@resend.dev>',
      to: ['delivered@resend.dev'],
      subject: 'お問い合わせ',
      react: EmailTemplate({
        name,
        email,
        message,
      }),
      text: `名前: ${name}\nメールアドレス: ${email}\nメッセージ: ${message}`,
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
