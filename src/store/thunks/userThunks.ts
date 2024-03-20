import { createAsyncThunk } from '@reduxjs/toolkit'
import { getUserInfo } from 'apis/userApi'
import { GetUserInfo } from 'types/userApiType'

export const getUserInfoThunk = createAsyncThunk(
  'user/getUserInfo',
  async ({ userId }: GetUserInfo) => {
    try {
      const response = await getUserInfo({ userId })

      return response
    } catch (error) {
      console.log(error)
    }
  },
)
