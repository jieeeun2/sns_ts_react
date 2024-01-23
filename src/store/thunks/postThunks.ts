import { createAsyncThunk } from '@reduxjs/toolkit'
import { postApi } from 'apis/postApi'
import { AddPost } from 'types/postApiType'

export const addPost = createAsyncThunk(
  'post/addPost',
  async ({ userId, content, images }: AddPost) => {
    try {
      const response = await postApi.addPost({ userId, content, images })

      return response
    } catch (error) {
      console.log(error)
    }
  },
)

export const getPosts = createAsyncThunk('post/getPosts', async () => {
  try {
    const response = await postApi.getPosts()
    return response
  } catch (error) {
    console.log(error)
  }
})
