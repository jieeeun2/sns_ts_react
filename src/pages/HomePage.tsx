import styled from 'styled-components'
import FriendListWidget from 'components/home/FriendListWidget'
import PostListWidget from 'components/home/PostListWidget'
import PostingWidget from 'components/home/PostingWidget'
import ProfileWidget from 'components/home/ProfileWidget'

const HomePage = () => {
  return (
    <HomePageLayout>
      <div>
        <ProfileWidget />
      </div>
      <div>
        <PostingWidget />
        <PostListWidget />
      </div>
      <div>
        <FriendListWidget />
      </div>
    </HomePageLayout>
  )
}

export default HomePage

const HomePageLayout = styled.div`
  height: calc(100dvh - 90px);
  display: flex;
  gap: 24px;
  padding: 24px;
  background: ${({ theme }) => theme.background.default};
`
