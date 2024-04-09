import { FC, ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'
import { themeSettings } from 'styles/theme'
import GlobalStyle from 'styles/GlobalStyle'
import useModeContext from 'context/hooks/useModeContext'

interface ModeProviderProps {
  children: ReactNode
}

const StyleProvider: FC<ModeProviderProps> = ({ children }) => {
  const { mode } = useModeContext()
  const theme = themeSettings(mode)

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </ThemeProvider>
  )
}

export default StyleProvider
