import { ChangeEvent, FC, TextareaHTMLAttributes, useEffect, useRef } from 'react'
import styled from 'styled-components'

interface DynamicHeightTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  text: string
  changeText: (newText: string) => void
}

const DynamicHeightTextarea: FC<DynamicHeightTextareaProps> = ({ text, changeText, ...rest }) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  useEffect(() => {
    resizeTextArea()
    window.addEventListener('resize', resizeTextArea)
  }, [])

  const resizeTextArea = () => {
    if (!textAreaRef.current) return

    textAreaRef.current.style.height = '20px'
    textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`
  }

  const changeTextAndResize = (e: ChangeEvent<HTMLTextAreaElement>) => {
    changeText(e.target.value)
    resizeTextArea()
  }

  return (
    <Textarea
      value={text}
      ref={textAreaRef}
      onChange={changeTextAndResize}
      spellCheck='false'
      {...rest}
    />
  )
}

export default DynamicHeightTextarea

export const Textarea = styled.textarea`
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.neutral.light};
  color: ${({ theme }) => theme.neutral.dark};
  outline: none;
  flex-grow: 1;
  box-sizing: border-box;
  padding: 12px;
  resize: none;
`
