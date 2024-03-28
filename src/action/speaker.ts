'use server'

import jwt from 'jsonwebtoken'
import type { z } from 'zod'

import { setSpeakerInfoSchema } from '@/schemas/user'
import type { ActionsResult, GetSpeakerListActionResult } from '@/types/action'

import { auth, unstable_update } from '../../auth'

export const getSpeakerList = async (): Promise<GetSpeakerListActionResult> => {
  const speakerList = await fetch(`${process.env.API_URL}/speaker`, {
    method: 'GET',
  })
    .then((res) => {
      if (!res.ok) {
        return {
          isSuccess: false,
          error: {
            message: '発表者情報の取得に失敗しました',
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
    message: '発表者情報を取得しました',
    data: speakerList,
  }
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

  const { name, display_name, speaker_id, school, course } =
    validatedFields.data

  const updatedUser = await fetch(`${process.env.API_URL}/user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      ...user,
      name,
      display_name,
      speaker_id,
      school,
      course,
    }),
  })
    .then((res) => {
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
    message: '発表者情報を設定しました',
  }
}
