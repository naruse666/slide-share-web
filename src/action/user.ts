'use server'

import type { z } from 'zod'

import { setSpeakerInfoSchema } from '@/schemas/user'
import type { ActionsResult } from '@/types/action'
import type { SignUp, User } from '@/types/user'

import { auth, unstable_update } from '../../auth'

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

export const setSpeakerInfo = async (
  values: z.infer<typeof setSpeakerInfoSchema>,
): Promise<ActionsResult> => {
  const validatedFields = setSpeakerInfoSchema.safeParse(values)
  const session = await auth()
  const user = session?.user

  if (!user) {
    return {
      isSuccess: false,
      error: {
        message: 'ログインしてください',
      },
    }
  }

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    }
  }

  const { speaker_id, school, course } = validatedFields.data

  const updatedUser = await fetch(`${process.env.API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      ...user,
      speaker_id,
      school,
      course,
    }),
  })
    .then((res) => {
      console.log('res', res)
      if (!res.ok) {
        return {
          isSuccess: false,
          error: {
            message: '登録に失敗しました',
          },
        }
      }
      return res.json()
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    })

  unstable_update({
    ...session,
    user: {
      ...updatedUser,
    },
  })

  return {
    isSuccess: true,
    message: '登録に成功しました',
  }
}
