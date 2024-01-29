export interface AddPost {
  userId: string
  content: string
  images: File[]
}

export interface GetPosts {
  currentPage: number
}
