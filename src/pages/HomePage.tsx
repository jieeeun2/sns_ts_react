import styled from 'styled-components'
import FriendListWidget from 'components/home/FriendListWidget'
import PostListWidget from 'components/home/PostListWidget'
import PostingWidget from 'components/home/PostingWidget'
import ProfileWidget from 'components/home/ProfileWidget'
import { useParams } from 'react-router-dom'

const HomePage = () => {
  const { userId } = useParams()

  return (
    <HomePageLayout>
      <div>
        <ProfileWidget userId={userId} />
      </div>
      <div>
        {!userId && <PostingWidget />}
        <PostListWidget userId={userId} />
      </div>
      <div>
        <FriendListWidget userId={userId} />
      </div>
    </HomePageLayout>
  )
}

export default HomePage

const HomePageLayout = styled.div`
  min-height: calc(100dvh - 90px);
  display: flex;
  gap: 24px;
  padding: 24px;
  background: ${({ theme }) => theme.background.default};
`
