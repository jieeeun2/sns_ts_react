import { createSlice } from '@reduxjs/toolkit'
import {
  addPostThunk,
  getPostsThunk,
  deletePostThunk,
  updatePostThunk,
} from 'store/thunks/postThunks'
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
      .addCase(addPostThunk.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(addPostThunk.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.entities = [action.payload, ...state.entities]
        }
      })
      .addCase(addPostThunk.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })

      .addCase(getPostsThunk.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(getPostsThunk.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.entities = [...state.entities, ...action.payload.posts]
          state.hasNextPage = action.payload.hasNextPage
          state.currentPage += 1
        }
      })
      .addCase(getPostsThunk.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })

      .addCase(deletePostThunk.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(deletePostThunk.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.entities = state.entities.filter((entity) => entity.id !== action.payload.postId)
        }
      })
      .addCase(deletePostThunk.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })

      .addCase(updatePostThunk.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(updatePostThunk.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.entities = state.entities.map((entity) =>
            entity.id === action.payload.post.id ? action.payload.post : entity,
          )
        }
      })
      .addCase(updatePostThunk.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })
  },
})

export default postsSlice.reducer
