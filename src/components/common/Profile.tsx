import { FC } from 'react'
import styled from 'styled-components'

interface ProfileProps {
  isProfileWidget?: boolean
}

const Profile: FC<ProfileProps> = ({ isProfileWidget = false }) => {
  return (
    <ProfileLayout $isProfileWidget={isProfileWidget}>
      <img src='/images/profileImage.jpg' />
      <div>
        <span className='user_name'>관리자</span>
        <span className='user_info'>{isProfileWidget ? '친구수 N명' : '서울, 대한민국'}</span>
      </div>
    </ProfileLayout>
  )
}

export default Profile

const ProfileLayout = styled.div<{ $isProfileWidget: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;

  & > img {
    width: ${({ $isProfileWidget }) => ($isProfileWidget ? '70px' : '50px')};
    height: ${({ $isProfileWidget }) => ($isProfileWidget ? '70px' : '50px')};
    border-radius: 50%;
  }

  & > div {
    display: flex;
    flex-direction: column;

    span {
      white-space: nowrap;

      &.user_name {
        font-size: ${({ $isProfileWidget }) => ($isProfileWidget ? '20px' : '16px')};
        font-weight: 900;
      }

      &.user_info {
        font-size: 12px;
        color: ${({ theme }) => theme.neutral.mediumMain};
      }
    }
  }
`
