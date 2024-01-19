import { createSlice } from '@reduxjs/toolkit'
import { User } from 'types/userType'

export interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
