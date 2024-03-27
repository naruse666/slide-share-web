import { randomUUID } from 'crypto'
import jwt from 'jsonwebtoken'
import NextAuth from 'next-auth'

import { signUp } from '@/action/user'

import authConfig from './auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
  unstable_update,
} = NextAuth({
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async session({ session, token }) {
      const user = await signUp({
        id: token.sub || randomUUID(),
        email: session.user.email,
        name: session.user.name || token.name || '',
        image: session.user.image || token.picture || '',
      })
      const accessToken = jwt.sign(
        {
          id: token.sub || randomUUID(),
          role: user.role || 'user',
        },
        process.env.AUTH_SECRET!,
        {
          expiresIn: '7d',
        },
      )

      session.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role || 'user',
        speaker_id: user.speaker_id,
        school: user.school,
        course: user.course,
        emailVerified: user.created_at,
      }
      session.accessToken = accessToken

      console.log('session', session)
      return session
    },
    async jwt({ token }) {
      return token
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
})
