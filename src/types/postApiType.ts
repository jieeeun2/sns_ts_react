export interface AddPost {
  userId: string
  content: string
  images: File[]
}

export interface GetPosts {
  currentPage: number
}

export interface GetUserPosts {
  userId: string
  currentPage: number
}

export interface DeletePost {
  postId: string
}

export interface UpdatePost {
  postId: string
  content: string
  imagesToAdd: File[]
  imagePathsToDelete: string[]
}

export interface AddComment {
  postId: string
  userId: string
  content: string
}

export interface GetCommentList {
  postId: string
}

export interface RemoveCommentList {
  postId: string
  commentId: string
}

export interface ModifyComment {
  postId: string
  commentId: string
  content: string
}

export interface ModifyLike {
  postId: string
  userId: string
}
