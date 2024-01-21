export interface PostInputValue {
  content: string
  images: File[]
}

export interface Post {
  id: string
  userId: string
  name: string
  profileImagePath: string
  location: string
  content: string
  imagePaths: string[]
  numberOfLikes: number
  numberOfComments: number
  createdAt: Date
  updatedAt: Date
}
