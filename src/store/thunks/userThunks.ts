import { createAsyncThunk } from '@reduxjs/toolkit'
import { updateFollowingList, getUserInfo } from 'apis/userApi'
import { UpdateFollowingList, GetUserInfo } from 'types/userApiType'

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

export const updateFollowingListThunk = createAsyncThunk(
  'user/updateFollowingList',
  async ({ userId, targetUserId }: UpdateFollowingList) => {
    try {
      const response = await updateFollowingList({ userId, targetUserId })

      return response
    } catch (error) {
      console.log(error)
    }
  },
)
