import type { Speaker } from './speaker'

export type ActionsResult =
  | {
      isSuccess: true
      message: string
    }
  | {
      isSuccess: false
      error: {
        message: string
      }
    }

export type GetSpeakerListActionResult = ActionsResult & {
  data: Speaker[]
}
