import NextAuth from 'next-auth'

import authConfig from './auth.config'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: '/auth',
  },
  callbacks: {
    async session({ token, session, user }) {
      console.log('\n===== session callback =====\n')
      console.log('session', session)
      console.log('token', token)
      console.log('user', user)
      return session
    },
    async jwt({ token, user, account, profile }) {
      console.log('\n===== jwt callback =====\n')
      console.log('token', token)
      console.log('user', user)
      console.log('account', account)
      console.log('profile', profile)
      return token
    },
  },
  session: { strategy: 'jwt' },
  secret: process.env.AUTH_SECRET,
  debug: true,
  ...authConfig,
})
