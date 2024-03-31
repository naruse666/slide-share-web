export type Slide = {
  id: string
  title: string
  is_publish: boolean
  drive_pdf_url: string
  storage_thumbnail_url: string
  google_slide_share_url: string
  group_id: string
  speaker_id: string
  speaker_name: string
  speaker_image: string
}

export type SlideGroup = {
  id: string
  title: string
  drive_id: string
  presentation_at: string
  slide_list: Slide[]
}
