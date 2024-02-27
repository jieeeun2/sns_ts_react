import { createAsyncThunk } from '@reduxjs/toolkit'
import { RootState } from 'store'
import { addPost, deletePost, getPosts, updatePost } from 'apis/postApi'
import { AddPost, DeletePost, UpdatePost } from 'types/postApiType'

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

export const deletePostThunk = createAsyncThunk(
  'posts/deletePost',
  async ({ postId }: DeletePost) => {
    try {
      const response = await deletePost({ postId })

      return response
    } catch (error) {
      console.log(error)
    }
  },
)

export const updatePostThunk = createAsyncThunk(
  'posts/updatePost',
  async ({ postId, content, images, imagePaths }: UpdatePost) => {
    try {
      const response = await updatePost({ postId, content, images, imagePaths })

      return response
    } catch (error) {
      console.log(error)
    }
  },
)
