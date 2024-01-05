import { FC, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { RootState } from 'store'
import { themeSettings } from 'styles/theme'

interface ModeProviderProps {
  children: ReactNode
}

const ModeProvider: FC<ModeProviderProps> = ({ children }) => {
  const mode = useSelector((state: RootState) => state.mode.mode)
  const theme = themeSettings(mode)

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ModeProvider
