import { FC, ReactNode, createContext, useState } from 'react'

type ModeType = 'dark' | 'light'

interface ModeContextType {
  mode: ModeType
  changeMode: () => void
}

interface ModeProviderProps {
  children: ReactNode
}

export const ModeContext = createContext<ModeContextType>({ mode: 'dark', changeMode: () => {} })

const ModeProvider: FC<ModeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ModeType>('dark')

  const changeMode = () => {
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }

  return <ModeContext.Provider value={{ mode, changeMode }}>{children}</ModeContext.Provider>
}

export default ModeProvider
