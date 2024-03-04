import { axiosInstance } from 'configs/axiosInstance'
import { AddPost, DeletePost, GetPosts, UpdatePost } from 'types/postApiType'

export const addPost = async ({ userId, content, images }: AddPost) => {
  try {
    const formData = new FormData()

    formData.append('userId', userId)
    formData.append('content', content)
    images.forEach((image) => formData.append('images', image))

    const response = await axiosInstance('/post', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getPosts = async ({ currentPage }: GetPosts) => {
  try {
    const response = await axiosInstance('/post', {
      method: 'GET',
      params: { currentPage },
    })

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const deletePost = async ({ postId }: DeletePost) => {
  try {
    const response = await axiosInstance(`/post/${postId}`, {
      method: 'DELETE',
    })

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const updatePost = async ({
  postId,
  content,
  imagesToAdd,
  imagePathsToDelete,
}: UpdatePost) => {
  try {
    const formData = new FormData()

    formData.append('content', content)
    imagesToAdd.forEach((image) => formData.append('images', image))
    imagePathsToDelete.forEach((imagePath, index) =>
      formData.append(`imagePaths[${index}]`, imagePath),
    )

    const response = await axiosInstance(`/post/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}
