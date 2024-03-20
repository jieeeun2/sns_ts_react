import { axiosInstance } from 'configs/axiosInstance'
import { GetUserInfo } from 'types/userApiType'

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
