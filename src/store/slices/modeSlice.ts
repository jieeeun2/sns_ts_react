import { createSlice } from '@reduxjs/toolkit'

export interface ModeState {
  mode: 'light' | 'dark'
}

const initialState: ModeState = {
  mode: 'dark',
}

export const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
    },
  },
})

export const { setMode } = modeSlice.actions

export default modeSlice.reducer