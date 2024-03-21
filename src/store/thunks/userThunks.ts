import { createAsyncThunk } from '@reduxjs/toolkit'
import { addRemoveFriend, getUserInfo } from 'apis/userApi'
import { AddRemoveFriend, GetUserInfo } from 'types/userApiType'

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

export const addRemoveFriendThunk = createAsyncThunk(
  'user/addRemoveFriend',
  async ({ userId, friendId }: AddRemoveFriend) => {
    try {
      const response = await addRemoveFriend({ userId, friendId })

      return response
    } catch (error) {
      console.log(error)
    }
  },
)
