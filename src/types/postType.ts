export interface PostInputValue {
  content: string
  images: File[]
}

export interface UpdatePostInputValue {
  content: string
  imagesToAdd: File[]
  existingImagePaths: string[]
  imagePathsToDelete: string[]
}

export interface Post {
  id: string
  userId: string
  name: string
  profileImagePath: string
  location: string
  content: string
  imagePaths: string[]
  likes: Map<string, boolean>
  numberOfComments: number
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  userId: string
  name: string
  profileImagePath: string
  content: string
  isDelete: boolean
  isModify: boolean
  createdAt: Date
  updatedAt: Date
}
