import styled from 'styled-components'
import { Button } from 'styles/ReuseableComponent'

interface ModalProps {
  message: string
  button: {
    text: string
    action: () => void
  }
}

const useModal = ({ message, button }: ModalProps) => {
  const doWhat = () => {
    if (!button) return
    button.action()
  }

  const ModalComponent = () => {
    return (
      <ModalLayout>
        <ModalBox>
          {message.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
          {button && <Button onClick={doWhat}>{button.text}</Button>}
        </ModalBox>
      </ModalLayout>
    )
  }

  return ModalComponent
}

export default useModal

const ModalLayout = styled.div`
  height: calc(100dvh - 90px);
  display: flex;
  justify-content: center;
  padding-top: 200px;
  padding-bottom: auto;
  box-sizing: border-box;
  background: ${({ theme }) => theme.background.default};
`

const ModalBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.background.alt};
  color: ${({ theme }) => theme.neutral.dark};
  padding: 20px;
  box-sizing: border-box;
  width: 400px;
  height: 200px;

  & > button {
    width: fit-content;
  }
`
