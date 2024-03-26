import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { WidgetLayout } from 'styles/ReuseableComponent'

interface ProfileProps {
  isProfileWidget?: boolean
  id: string
  profileImagePath: string
  name: string
  numberOfFollowings?: number
  location?: string
}

const Profile: FC<ProfileProps> = ({
  isProfileWidget = false,
  id,
  profileImagePath,
  name,
  numberOfFollowings,
  location,
}) => {
  const navigate = useNavigate()

  const goToUserPage = () => {
    navigate(`/profile/${id}`)
  }

  return (
    <ProfileLayout onClick={goToUserPage} $isProfileWidget={isProfileWidget}>
      <img src={profileImagePath} />
      <div>
        <span className='user_name'>{name}</span>
        <span className='user_info'>
          {isProfileWidget ? `친구수 ${numberOfFollowings}명` : `${location}`}
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
  cursor: pointer;
  width: fit-content;

  & > img {
    width: ${({ $isProfileWidget }) => ($isProfileWidget ? '70px' : '50px')};
    height: ${({ $isProfileWidget }) => ($isProfileWidget ? '70px' : '50px')};
    border-radius: 50%;
    object-fit: cover;
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
