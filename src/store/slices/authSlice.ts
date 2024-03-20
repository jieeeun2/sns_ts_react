import { createSlice } from '@reduxjs/toolkit'
import { User } from 'types/authType'

export interface UserState {
  entity: User | null
}

const initialState: UserState = {
  entity: null,
}

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.entity = action.payload.user
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer
