import { createBrowserRouter } from 'react-router-dom'
import { RouterElement } from 'types/routerType'
import App from 'App'
import HomePage from 'pages/HomePage'
import LoginPage from 'pages/LoginPage'
import AdminPage from 'pages/AdminPage'
import NotFoundPage from 'pages/NotFoundPage'
import ProtectedRoute from 'routes/ProtectedRoute'

const routerChildrenData: RouterElement[] = [
  {
    index: true,
    path: '/',
    element: <HomePage />,
    withAuth: true,
  },
  {
    path: '/profile/:userId',
    element: <HomePage />,
    withAuth: true,
  },
  {
    path: '/login',
    element: <LoginPage />,
    withAuth: false,
  },
  {
    path: '/admin',
    element: <AdminPage />,
    withAuth: true,
    isAdminPage: true,
  },
]

const routerWithAuth = routerChildrenData.map((router) => ({
  index: router.index,
  path: router.path,
  element: router.withAuth ? (
    <ProtectedRoute isAdminPage={'isAdminPage' in router && router.isAdminPage}>
      {router.element}
    </ProtectedRoute>
  ) : (
    router.element
  ),
}))

const routerData = [
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: routerWithAuth,
  },
]

export const routers = createBrowserRouter(routerData)
