import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'user' | 'speaker' | 'admin'
  speaker_id?: string
  display_name?: string
  school?: string
  course?: string
  is_top_display?: boolean
  created_at?: Date
  updated_at?: Date
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
    accessToken: string
  }
}
