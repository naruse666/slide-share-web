export type SignUp = {
  id: string
  name: string
  email: string
  image: string
}

export type User = {
  id: string
  name: string
  email: string
  image: string
  role: 'user' | 'speaker' | 'admin'
  speaker_id?: string
  display_name?: string
  school?: string
  course?: string
  created_at: Date
  updated_at: Date
}
