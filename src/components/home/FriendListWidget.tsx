import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'store'
import { Span, WidgetLayout } from 'styles/ReuseableComponent'
import Profile from 'components/common/Profile'
import { Friend } from 'types/userType'
import { getFollowList } from 'apis/userApi'

interface FriendListWidgetProps {
  userId?: string
}

interface FriendList {
  followerList: Friend[]
  followingList: Friend[]
}

const FriendListWidget: FC<FriendListWidgetProps> = ({ userId }) => {
  const [friendList, setFriendList] = useState<FriendList>({ followerList: [], followingList: [] })

  const dispatch = useAppDispatch()
  const loggedInUser = useAppSelector((state) => state.user.entity!)

  useEffect(() => {
    const fetchFollowingList = async () => {
      if (userId) {
        const response = await getFollowList({ userId })
        setFriendList({ followerList: response.followers, followingList: response.followings })
      } else {
        setFriendList({
          followerList: loggedInUser.followers,
          followingList: loggedInUser.followings,
        })
      }
    }
    fetchFollowingList()
  }, [dispatch, loggedInUser, userId])

  const { followerList, followingList } = friendList

  return (
    <FriendListWidgetLayout>
      <Span>친구 목록</Span>
      {followerList.length > 0 && (
        <CategoryBox>
          <Span>나를 추가한 친구</Span>
          {followerList?.map(({ id, profileImagePath, name, location }, index) => (
            <Profile
              key={index}
              id={id}
              profileImagePath={profileImagePath}
              name={name}
              location={location}
            />
          ))}
        </CategoryBox>
      )}
      {followingList.length > 0 && (
        <CategoryBox>
          <Span>내가 추가한 친구</Span>
          {followingList?.map(({ id, profileImagePath, name, location }, index) => (
            <Profile
              key={index}
              id={id}
              profileImagePath={profileImagePath}
              name={name}
              location={location}
            />
          ))}
        </CategoryBox>
      )}
    </FriendListWidgetLayout>
  )
}

export default FriendListWidget

const FriendListWidgetLayout = styled(WidgetLayout)`
  width: 250px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;

  & > span {
    color: ${({ theme }) => theme.neutral.dark};
    font-size: 16px;
    font-weight: 900;
  }
`

const CategoryBox = styled.div`
  & > div {
    padding-left: 0;
    padding-right: 0;
  }
`
