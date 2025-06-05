export interface Video {
  id: string
  title: string
  url: string
  thumbnail: string
  duration?: string
}

export interface Employer {
  id: string
  name: string
  jobTitle?: string
  duration?: string
  employmentType?: "full-time" | "contract" | "freelance"
  summary?: string
  videos?: Video[]
}

export interface ProfileData {
  username: string
  firstName: string
  lastName: string
  title?: string
  summary?: string
  location?: string
  originalUrl?: string
  employers?: Employer[]
}
