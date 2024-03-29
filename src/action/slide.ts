'use server'

import type {
  GetSlideActionResult,
  GetSlideGroupActionResult,
} from '@/types/action'

export const getNewestSlideGroup =
  async (): Promise<GetSlideGroupActionResult> => {
    const slideGroup = await fetch(`${process.env.API_URL}/slides`, {
      method: 'GET',
      cache: 'force-cache',
    })
      .then((res) => {
        if (!res.ok) {
          return null
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
      message: 'スライドグループを取得しました',
      data: slideGroup,
    }
  }

export const getSlideGroup = async (
  id: string,
): Promise<GetSlideGroupActionResult> => {
  const slideGroup = await fetch(`${process.env.API_URL}/slides/${id}`, {
    method: 'GET',
    cache: 'force-cache',
  })
    .then((res) => {
      if (!res.ok) {
        return null
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
    message: 'スライドグループを取得しました',
    data: slideGroup,
  }
}

export const getSlide = async (
  groupId: string,
  slideId: string,
): Promise<GetSlideActionResult> => {
  const slide = await fetch(
    `${process.env.API_URL}/slides/${groupId}/${slideId}`,
    {
      method: 'GET',
      cache: 'force-cache',
    },
  )
    .then((res) => {
      if (!res.ok) {
        return null
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
    message: 'スライドを取得しました',
    data: slide,
  }
}
