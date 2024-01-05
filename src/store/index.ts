import { configureStore } from '@reduxjs/toolkit'
import modeReducer from 'store/modeSlice'

export const store = configureStore({
  reducer: {
    mode: modeReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
