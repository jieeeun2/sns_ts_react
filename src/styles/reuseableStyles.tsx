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
