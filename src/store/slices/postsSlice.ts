import { createSlice } from '@reduxjs/toolkit'
import { addPost, getPosts } from 'store/thunks/postThunks'
import { Post } from 'types/postType'

interface PostsState {
  entities: Post[]
  currentPage: number
  hasNextPage: boolean
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string
}

const initialState: PostsState = {
  entities: [],
  currentPage: 1,
  hasNextPage: false,
  loading: 'idle',
  error: '',
}

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addPost.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(addPost.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.entities = [action.payload, ...state.entities]
        }
      })
      .addCase(addPost.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })

      .addCase(getPosts.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.entities = [...state.entities, ...action.payload.posts]
          state.hasNextPage = action.payload.hasNextPage
          state.currentPage += 1
        }
      })
      .addCase(getPosts.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })
  },
})

export default postsSlice.reducer
