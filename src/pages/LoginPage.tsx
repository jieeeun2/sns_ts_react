import styled from 'styled-components'
import { register, login } from 'apis/authApi'
import { setUser } from 'store/slices/userSlice'
import { setAccessToken } from 'utils/localStorage'
import { useAppDispatch } from 'store'

const LoginPage = () => {
  const dispatch = useAppDispatch()

  const temporaryRegister = async () => {
    const mockData = {
      name: 'test2',
      email: 'test2@sociopedia.com',
      password: 'test2',
      profileImage: new File(['dummy content'], 'dummy_filename.jpg', { type: 'image/jpeg' }),
      location: '',
      occupation: '',
    }
    const registerResult = await register(mockData)
    console.log('registerResult', registerResult)
  }

  const temporaryLogin = async () => {
    const isAutoLogin = false
    const mockData = {
      email: 'test2@sociopedia.com',
      password: 'test2',
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
