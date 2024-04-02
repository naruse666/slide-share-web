import * as React from 'react'

interface EmailTemplateProps {
  name: string
  email: string
  message: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  message,
}) => (
  <div>
    <p>お問い合わせ内容</p>
    <p>お名前: {name}</p>
    <p>メールアドレス: {email}</p>
    <p>お問い合わせ内容: {message}</p>
  </div>
)
