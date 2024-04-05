import type { Slide } from './slide'

export type Speaker = {
  speaker_id: string
  display_name: string
  image: string
  school: string
  course: string
  is_top_display: boolean
  created_at: Date
  updated_at: Date
}

export type SpeakerWithSlide = Speaker & {
  slide_list: Slide[]
}
