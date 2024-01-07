import { FC, ReactNode } from 'react'

interface ProtectedRouteProps {
  children: ReactNode
  isAdminPage?: boolean
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children, isAdminPage }) => {
  /* TODO: 라우팅 권한관리
    추후 구현하게 될 redux persist에 사용자정보가 없으면(=로그인되지않은 사용자) Login페이지로 리다이렉트
    사용자정보의 권한목록에 관리자가 없다면 Home페이지로 리다이렉트
  */
  return <div>{children}</div>
}

export default ProtectedRoute
