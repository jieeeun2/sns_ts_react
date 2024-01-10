import styled from 'styled-components'

export const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Input = styled.input`
  background: transparent;
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.neutral.light};
  color: ${({ theme }) => theme.neutral.dark};
  outline: none;
  width: 100%;
  min-height: 40px;
  padding: 0 12px;
`

export const Textarea = styled.textarea`
  border: none;
  border-radius: 8px;
  background: ${({ theme }) => theme.neutral.light};
  color: ${({ theme }) => theme.neutral.dark};
  outline: none;
  width: 100%;
  height: 80px;
  padding: 12px;
  resize: none;
`

export const Button = styled.button`
  cursor: pointer;
  background: ${({ theme }) => theme.neutral.light};
  color: ${({ theme }) => theme.neutral.dark};
  width: 60px;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  margin: 0;

  &:hover {
    background: ${({ theme }) => theme.primary.main};
    color: ${({ theme }) => theme.background.default};
  }
`

export const IconButton = styled(Button)`
  width: fit-content;
  padding: 8px;
  display: flex;
  align-items: center;
  gap: 2px;

  & > span {
    font-size: 12px;
  }
`

export const WidgetLayout = styled.div`
  padding: 8px;
  background: ${({ theme }) => theme.background.alt};
  color: ${({ theme }) => theme.neutral.dark};
  border-radius: 8px;
`

export const Hr = styled.hr`
  border: 0 solid rgba(255, 255, 255, 0.2);
  border-bottom-width: thin;
  margin: 0 12px;
`

export const Span = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.neutral.mediumMain};
  white-space: nowrap;

  &.bold {
    font-weight: 700;
  }
`
