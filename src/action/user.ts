'use server'

import type { GetUsersActionResult } from '@/types/action'
import type { SignUp, User } from '@/types/user'

import { auth } from '../../auth'

export const signUp = async (user: SignUp) => {
  const response = await fetch(`${process.env.API_URL}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(user),
  })
  return (await response.json()) as User
}

export const getUsers = async (): Promise<GetUsersActionResult> => {
  const session = await auth()
  const user = session?.user

  if (user?.role !== 'admin') {
    return {
      isSuccess: false,
      error: {
        message: '権限がありません',
      },
      data: [],
    }
  }

  const users = await fetch(`${process.env.API_URL}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    cache: 'no-store',
  })
    .then((res) => {
      if (!res.ok) {
        return {
          isSuccess: false,
          error: {
            message: 'ユーザーの取得に失敗しました',
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

  return {
    isSuccess: true,
    message: 'ユーザーの取得に成功しました',
    data: users,
  }
}
