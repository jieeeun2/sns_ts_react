import { FC } from 'react'
import styled from 'styled-components'
import { WidgetLayout } from 'styles/ReuseableComponent'

interface ProfileProps {
  isProfileWidget?: boolean
  profileImagePath: string
  name: string
  numberOfFriends?: number
  location?: string
}

const Profile: FC<ProfileProps> = ({
  isProfileWidget = false,
  profileImagePath,
  name,
  numberOfFriends,
  location,
}) => {
  return (
    <ProfileLayout $isProfileWidget={isProfileWidget}>
      <img src={profileImagePath} />
      <div>
        <span className='user_name'>{name}</span>
        <span className='user_info'>
          {isProfileWidget ? `친구수 ${numberOfFriends}명` : `${location}`}
        </span>
      </div>
    </ProfileLayout>
  )
}

export default Profile

const ProfileLayout = styled(WidgetLayout)<{ $isProfileWidget: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: ${({ $isProfileWidget }) => $isProfileWidget && '0px'};

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
