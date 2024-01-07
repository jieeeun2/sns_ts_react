import { ReactNode } from 'react'

interface RouterBase {
  index?: boolean
  path: string
  element: ReactNode
}

interface UserAccessibleRouterElement extends RouterBase {
  withAuth: boolean
}

interface AdminAccessibleRouterElement extends RouterBase {
  withAuth: true
  isAdminPage: boolean
}

export type RouterElement = UserAccessibleRouterElement | AdminAccessibleRouterElement
