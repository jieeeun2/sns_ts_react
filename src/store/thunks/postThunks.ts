import { createAsyncThunk } from '@reduxjs/toolkit'
import { postApi } from 'apis/postApi'
import { RootState } from 'store'
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

export const getPosts = createAsyncThunk('post/getPosts', async (_, { getState }) => {
  try {
    const { posts } = getState() as RootState
    const response = await postApi.getPosts({ currentPage: posts.currentPage })

    return response
  } catch (error) {
    console.log(error)
  }
})
