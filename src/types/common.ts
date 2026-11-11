export interface IProject {
  title: string
  description: string
  details?: string
  link: string
  img: string
  type?: 'corporate' | 'shop' | 'vue' | 'landing' | 'edutech'
  role: string[]
  stack?: string[]
}
