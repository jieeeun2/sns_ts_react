import { axiosInstance } from 'configs/axiosInstance'
import { AddRemoveFriend, GetUserInfo } from 'types/userApiType'

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

export const addRemoveFriend = async ({ userId, friendId }: AddRemoveFriend) => {
  try {
    const response = await axiosInstance(`/user/${userId}/${friendId}`, {
      method: 'PATCH',
    })

    return response.data.data
  } catch (error) {
    console.log(error)
  }
}
