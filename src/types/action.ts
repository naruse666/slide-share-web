import type { Slide, SlideGroup } from './slide'
import type { Speaker, SpeakerWithSlide } from './speaker'
import type { User } from './user'

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

export type GetUsersActionResult = ActionsResult & {
  data: User[]
}

export type GetSpeakerActionResult = ActionsResult & {
  data: SpeakerWithSlide
}

export type GetSpeakerListActionResult = ActionsResult & {
  data: Speaker[]
}

export type GetSlideGroupActionResult = ActionsResult & {
  data: SlideGroup
}

export type GetSlideGroupsActionResult = ActionsResult & {
  data: string[]
}

export type GetSlideActionResult = ActionsResult & {
  data: Slide
}
