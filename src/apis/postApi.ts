import { axiosInstance } from 'configs/axiosInstance'

interface CreatePost {
  userId: string
  content: string
  images: File[]
}

export const postApi = {
  async createPost({ userId, content, images }: CreatePost) {
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
      return response.data
    } catch (err) {
      console.log('err', err)
    }
  },
}
