import { FC, useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from 'store'
import { getFriendListThunk } from 'store/thunks/userThunks'
import { Span, WidgetLayout } from 'styles/ReuseableComponent'
import { User } from 'types/userType'

interface FriendListWidgetProps {
  loggedInUserInfo: User
}

const FriendListWidget: FC<FriendListWidgetProps> = ({ loggedInUserInfo }) => {
  const dispatch = useAppDispatch()

  const { id, friends } = loggedInUserInfo

  useEffect(() => {
    dispatch(getFriendListThunk({ userId: id }))
  }, [dispatch, id])

  return (
    <FriendListWidgetLayout>
      <Span>친구 목록</Span>
      {friends?.map((friend) => <div>{friend}</div>)}
    </FriendListWidgetLayout>
  )
}

export default FriendListWidget

const FriendListWidgetLayout = styled(WidgetLayout)`
  width: 250px;
  box-sizing: border-box;
`
