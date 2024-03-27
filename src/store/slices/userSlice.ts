import { createSlice } from '@reduxjs/toolkit'
import { getUserInfoThunk, updateFollowingListThunk } from 'store/thunks/userThunks'
import { User } from 'types/userType'

export interface UserState {
  entity: User | null
  loading: 'idle' | 'pending' | 'succeeded' | 'failed'
  error: string
}

const initialState: UserState = {
  entity: null,
  loading: 'idle',
  error: '',
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.entity = action.payload.user
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoThunk.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(getUserInfoThunk.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.entity = action.payload.user
        }
      })
      .addCase(getUserInfoThunk.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })

      .addCase(updateFollowingListThunk.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(updateFollowingListThunk.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          if (state.entity) {
            state.entity.followers = action.payload.followers
            state.entity.followings = action.payload.followings
          }
        }
      })
      .addCase(updateFollowingListThunk.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
