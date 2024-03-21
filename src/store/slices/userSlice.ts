import { createSlice } from '@reduxjs/toolkit'
import { getUserInfoThunk, addRemoveFriendThunk } from 'store/thunks/userThunks'
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
  reducers: {},
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

      .addCase(addRemoveFriendThunk.pending, (state) => {
        if (state.loading === 'idle') {
          state.loading = 'pending'
        }
      })
      .addCase(addRemoveFriendThunk.fulfilled, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.entity && (state.entity.friends = action.payload.friends)
        }
      })
      .addCase(addRemoveFriendThunk.rejected, (state, action) => {
        if (state.loading === 'pending') {
          state.loading = 'idle'
          state.error = action.error as string
        }
      })
  },
})

export default userSlice.reducer
