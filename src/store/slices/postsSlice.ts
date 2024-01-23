import { createSlice } from '@reduxjs/toolkit'
import { Post } from 'types/postType'

export interface PostState {
  posts: Post[]
}

const initialState: PostState = {
  posts: [],
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload.posts
    },
    setPost: (state, action) => {
      state.posts = [...state.posts, action.payload.post]
    },
  },
})

export const { setPosts, setPost } = postsSlice.actions

export default postsSlice.reducer
