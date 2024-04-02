import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react'
import styled from 'styled-components'
import { Button, Input, Span } from 'styles/ReuseableComponent'
import { useAppSelector } from 'store'
import { Comment } from 'types/postType'
import { getCommentList, modifyComment, removeCommentList } from 'apis/postApi'

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
  setCommentList,
}) => {
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false)
  const [text, setText] = useState<string>(content)

  const { id: loggedInUserId } = useAppSelector((state) => state.user.entity!)

  const deleteComment = async () => {
    await removeCommentList({ postId, commentId: id })
    const response = await getCommentList({ postId })
    setCommentList(response.comments)
  }

  const changeUpdateMode = (changeToUpdateModeYN: boolean, cancel?: boolean) => {
    setIsUpdateMode(changeToUpdateModeYN)
    cancel && setText(content)
  }

  const changeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value)
  }

  const updateComment = async () => {
    const response = await modifyComment({ postId, commentId: id, content: text })

    setCommentList((prev) =>
      prev.map((comment) => (comment.id == response.comment.id ? response.comment : comment)),
    )
    changeUpdateMode(false)
  }

  return (
    <CommentWidgetLayout>
      <img src={profileImagePath} />
      <DividedBox>
        <DividedSection>
          <Span className='name'>{name}</Span>
          <Span>{createdAt.toLocaleString()}</Span>
          {isModify && <Span>수정됨</Span>}
        </DividedSection>
        <DividedSection $isUpdateMode={isUpdateMode}>
          {isDelete ? (
            <span>삭제된 댓글입니다</span>
          ) : (
            <Input value={text} onChange={changeContent} readOnly={!isUpdateMode} />
          )}
        </DividedSection>
      </DividedBox>
      {userId === loggedInUserId && !isDelete && (
        <DividedSection>
          {!isUpdateMode ? (
            <>
              <Button onClick={() => changeUpdateMode(true)}>수정</Button>
              <Button onClick={deleteComment}>삭제</Button>
            </>
          ) : (
            <>
              <Button onClick={updateComment}>수정완료</Button>
              <Button onClick={() => changeUpdateMode(false, true)}>취소</Button>
            </>
          )}
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

  & > img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`

const DividedBox = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const DividedSection = styled.div<{ $isUpdateMode?: boolean }>`
  display: flex;
  gap: 8px;

  & > span {
    line-height: 20px;

    &.name {
      font-size: 16px;
      font-weight: 900;
    }
  }

  & > Input {
    background: ${({ $isUpdateMode }) => !$isUpdateMode && 'transparent'};
    padding: ${({ $isUpdateMode }) => $isUpdateMode && '4px 8px'};
  }
`
