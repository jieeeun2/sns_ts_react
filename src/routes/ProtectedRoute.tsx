import { FC, ReactNode } from 'react'
import { useAppSelector } from 'store'
import { useNavigate } from 'react-router-dom'
import useModal from 'hooks/useModal'

interface ProtectedRouteProps {
  children: ReactNode
  isAdminPage?: boolean
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, isAdminPage }) => {
  /* TODO: 라우팅 권한관리
    추후 구현하게 될 redux persist에 사용자정보가 없으면(=로그인되지않은 사용자) Login페이지로 리다이렉트
    사용자정보의 권한목록에 관리자가 없다면 Home페이지로 리다이렉트
  */
  const navigate = useNavigate()

  const loggedInUser = useAppSelector((state) => state.user.entity)

  const Modal = useModal({
    message: '해당 페이지에 접근 권한 없음.\n로그인이 필요합니다',
    button: {
      text: '로그인 하러 가기',
      action: () => {
        navigate('/login')
      },
    },
  })

  return <>{loggedInUser ? <>{children}</> : <Modal />}</>
}

export default ProtectedRoute
