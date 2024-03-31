import type { Slide } from './slide'

export type Speaker = {
  id: string
  speaker_id: string
  display_name: string
  image: string
  school: string
  course: string
  created_at: Date
  updated_at: Date
}

export type SpeakerWithSlide = Speaker & {
  slide_list: Slide[]
}
