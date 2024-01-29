import { axiosInstance } from 'configs/axiosInstance'
import { AddPost, GetPosts } from 'types/postApiType'

export const postApi = {
  async addPost({ userId, content, images }: AddPost) {
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
  },

  async getPosts({ currentPage }: GetPosts) {
    try {
      const response = await axiosInstance('/post', {
        method: 'GET',
        params: { currentPage },
      })

      return response.data.data
    } catch (error) {
      console.log(error)
    }
  },
}
