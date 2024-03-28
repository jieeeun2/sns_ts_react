import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdOutlineManageAccounts, MdOutlineLocationOn, MdOutlineWorkOutline } from 'react-icons/md'
import { IconButton, FlexBetween, Hr, WidgetLayout, Span } from 'styles/ReuseableComponent'
import Profile from 'components/common/Profile'
import { User } from 'types/userType'
import { useAppDispatch, useAppSelector } from 'store'
import { getUserInfo } from 'apis/userApi'

interface ProfileWidgetProps {
  userId?: string
}

const ProfileWidget: FC<ProfileWidgetProps> = ({ userId }) => {
  const [userInfo, setUserInfo] = useState<User>({
    id: '',
    name: '',
    profileImagePath: '',
    followers: [],
    followings: [],
    location: '',
    occupation: '',
    numberOfVisitorsToday: 0,
    totalNumberOfVisitors: 0,
  })

  const dispatch = useAppDispatch()
  const loggedInUser = useAppSelector((state) => state.user.entity!)

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userId) {
        const response = await getUserInfo({ userId })
        setUserInfo(response.user)
      } else {
        setUserInfo(loggedInUser)
      }
    }
    fetchUserInfo()
  }, [dispatch, loggedInUser, userId])

  const profileComponentProps = {
    isProfileWidget: true,
    id: userInfo.id,
    name: userInfo.name,
    profileImagePath: userInfo.profileImagePath,
    numberOfFollowers: userInfo.followers.length,
    numberOfFollowings: userInfo.followings.length,
  }

  return (
    <ProfileWidgetLayout>
      <UserInfoBox>
        <Profile {...profileComponentProps} />
        {loggedInUser.id === userInfo.id && (
          <IconButton>
            <MdOutlineManageAccounts className='icon' />
          </IconButton>
        )}
      </UserInfoBox>
      <Hr />
      <UserInfoDetailBox>
        <div>
          <MdOutlineLocationOn className='icon' />
          <Span>{userInfo.location}</Span>
        </div>
        <div>
          <MdOutlineWorkOutline className='icon' />
          <Span>{userInfo.occupation}</Span>
        </div>
      </UserInfoDetailBox>
      <Hr />
      <VisitorInfoBox>
        <div>
          <Span>일간 방문자수</Span>
          <Span className='bold'>{userInfo.numberOfVisitorsToday}</Span>
        </div>
        <div>
          <Span>총 방문자수</Span>
          <Span className='bold'>{userInfo.totalNumberOfVisitors}</Span>
        </div>
      </VisitorInfoBox>
    </ProfileWidgetLayout>
  )
}

export default ProfileWidget

const ProfileWidgetLayout = styled(WidgetLayout)`
  width: 250px;
  box-sizing: border-box;

  & > div {
    margin: 12px;
  }

  .icon {
    font-size: 24px;
  }
`

const UserInfoBox = styled(FlexBetween)`
  & > button {
    margin-left: 8px;
  }
`

const UserInfoDetailBox = styled.div`
  & > div {
    display: flex;
    gap: 12px;
  }
`

const VisitorInfoBox = styled.div`
  & > div {
    display: flex;
    justify-content: space-between;
  }
`
