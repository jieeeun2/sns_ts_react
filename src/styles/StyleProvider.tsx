import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { RootState } from 'store'
import { themeSettings } from 'styles/theme'
import GlobalStyle from 'styles/GlobalStyle'

interface ModeProviderProps {
  children: ReactNode
}

const StyleProvider: FC<ModeProviderProps> = ({ children }) => {
  const mode = useSelector((state: RootState) => state.mode.mode)
  const theme = themeSettings(mode)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

export default StyleProvider
