import styled from 'styled-components'

const HomePage = () => {
  return <HomePageLayout>HomePage</HomePageLayout>
}

export default HomePage

const HomePageLayout = styled.div`
  height: calc(100dvh - 90px);
  //vh는 모바일에서 주소창,네비게이션바 영역높이까지 차지해서 dvh 사용
`
