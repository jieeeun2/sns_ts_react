import { axiosInstance } from 'configs/axiosInstance'
import { UpdateFollowingList, GetUserInfo, GetFollowList } from 'types/userApiType'

export const getUserInfo = async ({ userId }: GetUserInfo) => {
  try {
    const response = await axiosInstance(`/user/${userId}`, {
      method: 'GET',
    })

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const getFollowList = async ({ userId }: GetFollowList) => {
  try {
    const response = await axiosInstance(`/user/${userId}/follows`, {
      method: 'GET',
    })

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}

export const updateFollowingList = async ({ userId, targetUserId }: UpdateFollowingList) => {
  try {
    const response = await axiosInstance(`/user/${userId}/${targetUserId}`, {
      method: 'PATCH',
    })

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}
