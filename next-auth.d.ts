import NextAuth, { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: 'user' | 'speaker' | 'admin'
  speaker_id: string
  school: string
  course: string
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
    accessToken: string
  }
}
