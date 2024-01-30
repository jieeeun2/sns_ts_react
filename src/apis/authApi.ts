import { axiosInstance } from 'configs/axiosInstance'

interface RegisterData {
  name: string
  email: string
  password: string
  profileImage: File
  location: string
  occupation: string
}

interface LoginData {
  email: string
  password: string
  isAutoLogin: boolean
}

export const register = async ({
  name,
  email,
  password,
  profileImage,
  location,
  occupation,
}: RegisterData) => {
  try {
    const registerInputValue = { name, email, password, profileImage, location, occupation }
    const registerInputValueList = Object.entries(registerInputValue)

    const formData = new FormData()
    registerInputValueList.map((value) => formData.append(value[0], value[1]))

    const response = await axiosInstance('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'multipart/form-data' },
      data: formData,
    })
    return response.data
  } catch (err) {
    console.log('err', err)
  }
}

export const login = async ({ email, password, isAutoLogin }: LoginData) => {
  try {
    const response = await axiosInstance('/auth/login', {
      method: 'POST',
      data: { email, password, isAutoLogin },
    })
    return response.data
  } catch (err) {
    console.log('err', err)
  }
}
