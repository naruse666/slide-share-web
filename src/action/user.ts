'use server'

import jwt from 'jsonwebtoken'
import { revalidatePath } from 'next/cache'
import type { z } from 'zod'

import { updateUserSchema } from '@/schemas/user'
import type {
  ActionsResult,
  GetUserActionResult,
  GetUsersActionResult,
} from '@/types/action'
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

export const getUser = async (id: string): Promise<GetUserActionResult> => {
  const session = await auth()
  const user = session?.user

  if (user?.role !== 'admin') {
    return {
      isSuccess: false,
      error: {
        message: '権限がありません',
      },
      data: null,
    }
  }

  const getUser = await fetch(`${process.env.API_URL}/user/${id}`, {
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
    data: getUser,
  }
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

export const updateUser = async (
  values: z.infer<typeof updateUserSchema>,
): Promise<ActionsResult> => {
  const validatedFields = updateUserSchema.safeParse(values)
  const session = await auth()
  const user = session?.user

  if (!user || user.role !== 'admin') {
    return {
      isSuccess: false,
      error: {
        message: '権限がありません',
      },
    }
  }

  const decoded = jwt.verify(session.accessToken, process.env.AUTH_SECRET!)
  if (typeof decoded === 'object' && decoded.id !== user.id) {
    return {
      isSuccess: false,
      error: {
        message: 'IDが一致しません',
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

  await fetch(`${process.env.API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      ...validatedFields.data,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return {
          isSuccess: false,
          error: {
            message: 'ユーザー情報の更新に失敗しました',
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

  revalidatePath('/users')

  return {
    isSuccess: true,
    message: 'ユーザー情報の更新に成功しました',
  }
}
