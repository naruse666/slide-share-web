export type Slide = {
  id: string
  title: string
  drive_pdf_url: string
  storage_thumbnail_url: string
  google_slide_share_url: string
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
