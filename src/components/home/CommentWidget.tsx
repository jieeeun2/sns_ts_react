import { FC } from 'react'
import styled from 'styled-components'
import { Button, Input, Span } from 'styles/ReuseableComponent'
import { useAppSelector } from 'store'
import { Comment } from 'types/postType'

const CommentWidget: FC<Comment> = ({
  id,
  userId,
  name,
  profileImagePath,
  content,
  isDelete,
  isModify,
  createdAt,
  updatedAt,
}) => {
  const { id: loggedInUserId } = useAppSelector((state) => state.user.entity!)

  const updateComment = () => {
    //TODO: 댓글수정api호출
  }

  const deleteComment = () => {
    //TODO: 댓글삭제api호출
  }

  return (
    <CommentWidgetLayout>
      <img src={profileImagePath} />
      <DividedBox>
        <DividedSection>
          <span className='name'>{name}</span>
          {isDelete ? <span>삭제된 게시물입니다</span> : <Input value={content} readOnly />}
        </DividedSection>
        <DividedSection>
          <Span>{createdAt.toLocaleString()}</Span>
          {isModify && <Span>수정됨</Span>}
        </DividedSection>
      </DividedBox>
      {userId === loggedInUserId && (
        <DividedSection>
          <Button onClick={updateComment}>수정</Button>
          <Button onClick={deleteComment}>삭제</Button>
        </DividedSection>
      )}
    </CommentWidgetLayout>
  )
}

export default CommentWidget

const CommentWidgetLayout = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    font-size: 16px;
  }

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`

const DividedBox = styled.div`
  flex-grow: 1;
`

const DividedSection = styled.div`
  display: flex;
  gap: 8px;

  & > span.name {
    font-weight: 900;
  }

  & > Input {
    background: transparent;
  }
`
