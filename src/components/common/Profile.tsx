import { FC, MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { MdOutlinePersonAdd } from 'react-icons/md'
import { MdOutlinePersonRemove } from 'react-icons/md'
import { useAppDispatch, useAppSelector } from 'store'
import { updateFollowingListThunk } from 'store/thunks/userThunks'
import { WidgetLayout } from 'styles/ReuseableComponent'

interface ProfileProps {
  isProfileWidget?: boolean
  isPostWidget?: boolean
  id: string
  profileImagePath: string
  name: string
  numberOfFollowers?: number
  numberOfFollowings?: number
  location?: string
}

const Profile: FC<ProfileProps> = ({
  isProfileWidget = false,
  isPostWidget = false,
  id,
  profileImagePath,
  name,
  numberOfFollowers = 0,
  numberOfFollowings = 0,
  location,
}) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { id: loggedInUserId, followings: myFollowings } = useAppSelector(
    (state) => state.user.entity!,
  )

  const goToUserPage = () => {
    id === loggedInUserId ? navigate('/') : navigate(`/profile/${id}`)
  }

  const updateFollowingList = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()

    dispatch(updateFollowingListThunk({ userId: loggedInUserId, targetUserId: id }))
  }

  const isFollow = myFollowings.some((following) => following.id === id)

  return (
    <ProfileLayout onClick={goToUserPage} $isProfileWidget={isProfileWidget}>
      <img src={profileImagePath} />
      <div>
        <span className='user_name'>{name}</span>
        {isProfileWidget ? (
          <>
            <span className='user_info'>팔로워 {numberOfFollowers}명</span>
            <span className='user_info'>팔로잉 {numberOfFollowings}명</span>
          </>
        ) : (
          <span className='user_info'>{location}</span>
        )}
      </div>
      {!isPostWidget && id !== loggedInUserId && (
        <button onClick={updateFollowingList}>
          {isFollow ? <MdOutlinePersonRemove /> : <MdOutlinePersonAdd />}
        </button>
      )}
    </ProfileLayout>
  )
}

export default Profile

const ProfileLayout = styled(WidgetLayout)<{ $isProfileWidget: boolean }>`
  width: ${({ $isProfileWidget }) => ($isProfileWidget ? '100%' : 'fit-content')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ $isProfileWidget }) => $isProfileWidget && '0px'};
  cursor: pointer;
  gap: 8px;

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

  & > button {
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    background: ${({ theme }) => theme.neutral.light};
    color: ${({ theme }) => theme.primary.dark};

    &:hover {
      background: ${({ theme }) => theme.primary.light};
    }

    & > * {
      font-size: 20px;
    }
  }
`
