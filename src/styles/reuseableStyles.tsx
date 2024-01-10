import styled from 'styled-components'

export const FlexBetween = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Input = styled.input`
  background: transparent;
  border: none;
  background: ${({ theme }) => theme.neutral.light};
  color: ${({ theme }) => theme.neutral.dark};
  outline: none;
  width: 100%;
`

export const Button = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`

export const WidgetLayout = styled.div`
  padding: 8px;
  background: ${({ theme }) => theme.background.alt};
  border-radius: 8px;
`

export const Hr = styled.hr`
  border: 0 solid ${({ theme }) => theme.neutral.medium};
  border-bottom-width: thin;
  margin: 0 12px;
`
