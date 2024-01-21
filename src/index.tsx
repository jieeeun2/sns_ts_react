import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import { persistor, store } from 'store'
import StyleProvider from 'styles/StyleProvider'
import { routers } from 'routes/routers'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StyleProvider>
          <RouterProvider router={routers} />
        </StyleProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
