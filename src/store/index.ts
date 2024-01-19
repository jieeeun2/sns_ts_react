import { configureStore } from '@reduxjs/toolkit'
import modeReducer from 'store/modeSlice'
import userReducer from 'store/userSlice'

export const store = configureStore({
  reducer: {
    mode: modeReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
