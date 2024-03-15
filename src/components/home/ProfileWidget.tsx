import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MdOutlineManageAccounts, MdOutlineLocationOn, MdOutlineWorkOutline } from 'react-icons/md'
import { IconButton, FlexBetween, Hr, WidgetLayout, Span } from 'styles/ReuseableComponent'
import Profile from 'components/common/Profile'
import { useAppSelector } from 'store'

const ProfileWidget = () => {
  const { entity } = useAppSelector((state) => state.user)
  const navigate = useNavigate()

  if (!entity) navigate('/login')

  const {
    id,
    name,
    email,
    profileImagePath,
    friends,
    location,
    occupation,
    numberOfVisitorsToday,
    totalNumberOfVisitors,
  } = entity!

  const profileComponentProps = {
    isProfileWidget: true,
    profileImagePath,
    name,
    numberOfFriends: friends?.length || 0,
    location,
  }

  return (
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
