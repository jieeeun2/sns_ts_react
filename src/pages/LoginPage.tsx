import styled from 'styled-components'
import { register, login } from 'apis/authApi'
import { setUser } from 'store/slices/userSlice'
import { setAccessToken } from 'utils/localStorage'
import { useAppDispatch } from 'store'

const LoginPage = () => {
  const dispatch = useAppDispatch()

  const temporaryRegister = async () => {
    const response = await fetch('images/nasa-hubble-space-telescope-zhCVbS0raD8-unsplash.jpg')
    const imageBlob = await response.blob()

    const profileImage = new File(
      [imageBlob],
      'nasa-hubble-space-telescope-zhCVbS0raD8-unsplash.jpg',
      { type: 'image/jpeg' },
    )

    const mockData = {
      name: '관리자',
      email: 'manager@sociopedia.com',
      password: 'manager',
      profileImage,
      location: '서울, 대한민국',
      occupation: '웹개발자',
    }
    const registerResult = await register(mockData)
    console.log('registerResult', registerResult)
  }

  const temporaryLogin = async () => {
    const isAutoLogin = false
    const mockData = {
      email: 'manager@sociopedia.com',
      password: 'manager',
      isAutoLogin,
    }
    const loginResult = await login(mockData)
    const { accessToken, user } = loginResult.data

    if (!isAutoLogin) setAccessToken(accessToken)
    dispatch(setUser({ user: user }))
  }

  return (
    <LoginPageLayout>
      <button onClick={temporaryRegister}>temporaryRegister</button>
      <button onClick={temporaryLogin}>temporaryLogin</button>
    </LoginPageLayout>
  )
}

export default LoginPage

const LoginPageLayout = styled.div`
  height: calc(100dvh - 90px);
`
