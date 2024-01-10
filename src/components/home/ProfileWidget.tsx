import styled from 'styled-components'
import { MdOutlineManageAccounts, MdOutlineLocationOn, MdOutlineWorkOutline } from 'react-icons/md'
import { IconButton, FlexBetween, Hr, WidgetLayout, Span } from 'styles/ReuseableComponent'

const ProfileWidget = () => {
  return (
    <ProfileWidgetLayout>
      <UserInfoBox>
        <UserInfoSection>
          <img src='/images/profileImage.jpg' />
          <div>
            <h3>관리자</h3>
            <Span>친구수 N명</Span>
          </div>
        </UserInfoSection>
        <IconButton>
          <MdOutlineManageAccounts className='icon' />
        </IconButton>
      </UserInfoBox>
      <Hr />
      <UserInfoDetailBox>
        <div>
          <MdOutlineLocationOn className='icon' />
          <Span>서울, 대한민국</Span>
        </div>
        <div>
          <MdOutlineWorkOutline className='icon' />
          <Span>웹개발자</Span>
        </div>
      </UserInfoDetailBox>
      <Hr />
      <VisitorInfoBox>
        <div>
          <Span>일간 방문자수</Span>
          <Span className='bold'>N</Span>
        </div>
        <div>
          <Span>총 방문자수</Span>
          <Span className='bold'>N</Span>
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

const UserInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  & > img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
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
