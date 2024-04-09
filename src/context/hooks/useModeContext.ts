import { ModeContext } from 'context/ModeProvider'
import { useContext } from 'react'

const useModeContext = () => {
  const context = useContext(ModeContext)

  if (!context) {
    throw new Error('useModeContext를 사용하려면 ModeProvider로 감싸져 있어야 합니다.')
  }

  return context
}

export default useModeContext
