import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { addPost, getPosts } from 'apis/postApi'
import { AddPost } from 'types/postApiType'

export const addPostThunk = createAsyncThunk(
  'posts/addPost',
  async ({ userId, content, images }: AddPost) => {
    try {
      const response = await addPost({ userId, content, images })

      return response
    } catch (error) {
      console.log(error)
    }
  },
)

export const getPostsThunk = createAsyncThunk('posts/getPosts', async (_, { getState }) => {
  try {
    const { posts } = getState() as RootState
    const response = await getPosts({ currentPage: posts.currentPage })

    return response
  } catch (error) {
    console.log(error)
  }
})
