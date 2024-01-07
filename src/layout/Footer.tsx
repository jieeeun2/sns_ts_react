import styled from 'styled-components'

const Footer = () => {
  return <FooterLayout>Copyright 2024. Jieeeun All rights reserved.</FooterLayout>
}

export default Footer

const FooterLayout = styled.div`
  background: ${({ theme }) => theme.background.alt};
  color: ${({ theme }) => theme.neutral.dark};
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
`
