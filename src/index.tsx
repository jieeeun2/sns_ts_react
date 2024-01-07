import React from 'react'
import ReactDOM from 'react-dom/client'
import 'index.css'
import reportWebVitals from './reportWebVitals'
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
