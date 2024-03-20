import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { MdOutlineManageAccounts, MdOutlineLocationOn, MdOutlineWorkOutline } from 'react-icons/md'
import { IconButton, FlexBetween, Hr, WidgetLayout, Span } from 'styles/ReuseableComponent'
import Profile from 'components/common/Profile'
import { User } from 'types/userType'
import { useAppDispatch, useAppSelector } from 'store'
import { getUserInfoThunk } from 'store/thunks/userThunks'

interface ProfileWidgetProps {
  loggedInUserInfo: User
  userId?: string
}

const ProfileWidget: FC<ProfileWidgetProps> = ({ loggedInUserInfo, userId }) => {
  const dispatch = useAppDispatch()
  const selectedUserInfo = useAppSelector((state) => state.user.entity)

  useEffect(() => {
    dispatch(getUserInfoThunk({ userId: userId || loggedInUserInfo.id }))
  }, [dispatch, loggedInUserInfo, userId])

  if (!selectedUserInfo) return null

  const {
    id,
    name,
    profileImagePath,
    friends,
    location,
    occupation,
    numberOfVisitorsToday,
    totalNumberOfVisitors,
  } = selectedUserInfo

  const profileComponentProps = {
    isProfileWidget: true,
    id,
    profileImagePath,
    name,
    numberOfFriends: friends?.length || 0,
  }

  return (
    <>
      {selectedUserInfo && (
        <ProfileWidgetLayout>
          <UserInfoBox>
            <Profile {...profileComponentProps} />
            <IconButton>
              <MdOutlineManageAccounts className='icon' />
            </IconButton>
          </UserInfoBox>
          <Hr />
          <UserInfoDetailBox>
            <div>
              <MdOutlineLocationOn className='icon' />
              <Span>{location}</Span>
            </div>
            <div>
              <MdOutlineWorkOutline className='icon' />
              <Span>{occupation}</Span>
            </div>
          </UserInfoDetailBox>
          <Hr />
          <VisitorInfoBox>
            <div>
              <Span>일간 방문자수</Span>
              <Span className='bold'>{numberOfVisitorsToday}</Span>
            </div>
            <div>
              <Span>총 방문자수</Span>
              <Span className='bold'>{totalNumberOfVisitors}</Span>
            </div>
          </VisitorInfoBox>
        </ProfileWidgetLayout>
      )}
    </>
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

const UserInfoBox = styled(FlexBetween)``

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
