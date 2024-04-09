import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { RouterProvider } from 'react-router-dom'
import { persistor, store } from 'store'
import ModeProvider from 'context/ModeProvider'
import StyleProvider from 'styles/StyleProvider'
import { routers } from 'routes/routers'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModeProvider>
          <StyleProvider>
            <RouterProvider router={routers} />
          </StyleProvider>
        </ModeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
