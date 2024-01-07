import React from 'react'
import ReactDOM from 'react-dom/client'
import 'index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { store } from 'store'
import ModeProvider from 'styles/ModeProvider'
import { routers } from 'routes/routers'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ModeProvider>
        <RouterProvider router={routers} />
      </ModeProvider>
    </Provider>
  </React.StrictMode>,
)
