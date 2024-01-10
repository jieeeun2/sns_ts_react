import styled from 'styled-components'
import { MdOutlineManageAccounts, MdOutlineLocationOn, MdOutlineWorkOutline } from 'react-icons/md'
import { Button, FlexBetween, Hr, WidgetLayout } from 'styles/reuseableStyles'

const ProfileWidget = () => {
  return (
    <ProfileWidgetLayout>
      <UserInfoBox>
        <UserInfoSection>
          <img src='/images/profileImage.jpg' />
          <div>
            <h3>관리자</h3>
            <span>친구수 N명</span>
          </div>
        </UserInfoSection>
        <Button>
          <MdOutlineManageAccounts className='icon' />
        </Button>
      </UserInfoBox>
      <Hr />
      <UserInfoDetailBox>
        <div>
          <MdOutlineLocationOn className='icon' />
          <span>서울, 대한민국</span>
        </div>
        <div>
          <MdOutlineWorkOutline className='icon' />
          <span>웹개발자</span>
        </div>
      </UserInfoDetailBox>
      <Hr />
      <VisitorInfoBox>
        <div>
          <span>일간 방문자수</span>
          <span className='bold'>N</span>
        </div>
        <div>
          <span>총 방문자수</span>
          <span className='bold'>N</span>
        </div>
      </VisitorInfoBox>
    </ProfileWidgetLayout>
  )
}

export default ProfileWidget

const ProfileWidgetLayout = styled(WidgetLayout)`
  width: 250px;
  margin: 28px;
  color: ${({ theme }) => theme.neutral.dark};

  & > div {
    margin: 12px;
  }

  .icon {
    font-size: 24px;
    color: ${({ theme }) => theme.neutral.dark};
  }

  span {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.neutral.mediumMain};

    &.bold {
      font-weight: 700;
    }
  }
`

const UserInfoBox = styled(FlexBetween)`
  display: flex;

  img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
  }
`

const UserInfoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
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
