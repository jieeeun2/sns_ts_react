import { Dispatch, FC, SetStateAction } from 'react'
import styled from 'styled-components'
import { Button, Input, Span } from 'styles/ReuseableComponent'
import { useAppSelector } from 'store'
import { Comment } from 'types/postType'
import { getCommentList, removeCommentList } from 'apis/postApi'

interface CommentWidgetProps extends Comment {
  postId: string
  setCommentList: Dispatch<SetStateAction<Comment[]>>
}

const CommentWidget: FC<CommentWidgetProps> = ({
  id,
  postId,
  userId,
  name,
  profileImagePath,
  content,
  isDelete,
  isModify,
  createdAt,
  updatedAt,
  setCommentList,
}) => {
  const { id: loggedInUserId } = useAppSelector((state) => state.user.entity!)

  const updateComment = () => {
    //TODO: 댓글수정api호출
  }

  const deleteComment = async () => {
    await removeCommentList({ postId, commentId: id })
    const response = await getCommentList({ postId })
    setCommentList(response.comments)
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
      {userId === loggedInUserId && !isDelete && (
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
    width: 40px;
    height: 40px;
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
