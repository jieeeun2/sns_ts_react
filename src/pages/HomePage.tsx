import styled from 'styled-components'
import FriendListWidget from 'components/home/FriendListWidget'
import PostListWidget from 'components/home/PostListWidget'
import PostingWidget from 'components/home/PostingWidget'
import ProfileWidget from 'components/home/ProfileWidget'
import { useParams } from 'react-router-dom'
import { useAppSelector } from 'store'

const HomePage = () => {
  const { userId } = useParams()
  const loggedInUserInfo = useAppSelector((state) => state.user.entity)

  return (
    <>
      {loggedInUserInfo && (
        <HomePageLayout>
          <div>
            <ProfileWidget loggedInUserInfo={loggedInUserInfo} />
          </div>
          <div>
            {!userId && <PostingWidget loggedInUserInfo={loggedInUserInfo} />}
            <PostListWidget userId={userId} />
          </div>
          <div>
            <FriendListWidget loggedInUserInfo={loggedInUserInfo} />
          </div>
        </HomePageLayout>
      )}
    </>
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
