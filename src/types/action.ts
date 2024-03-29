import type { Slide, SlideGroup } from './slide'
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

export type GetSlideGroupActionResult = ActionsResult & {
  data: SlideGroup
}

export type GetSlideActionResult = ActionsResult & {
  data: Slide
}
