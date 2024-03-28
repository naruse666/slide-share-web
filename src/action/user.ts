'use server'

import type { SignUp, User } from '@/types/user'

export const signUp = async (user: SignUp) => {
  const response = await fetch(`${process.env.API_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  return (await response.json()) as User
}
