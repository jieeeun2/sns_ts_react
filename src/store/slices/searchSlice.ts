import { createSlice } from '@reduxjs/toolkit'
import { searchThunk } from 'store/thunks/searchThunks'
import { Post } from 'types/postType'
import { User } from 'types/userType'

interface SearchState {
  results: {
    users: User[]
    posts: Post[]
  }
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string
}

const initialState: SearchState = {
  results: { users: [], posts: [] },
  loading: 'idle',
  error: '',
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchThunk.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(searchThunk.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.results = action.payload.results
        }
      })
      .addCase(searchThunk.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })
  },
})

export default searchSlice.reducer
