import { ChangeEvent, FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Input } from 'styles/ReuseableComponent'
import { Comment } from 'types/postType'
import CommentWidget from 'components/home/CommentWidget'
import { addComment, getCommentList } from 'apis/postApi'
import { useAppSelector } from 'store'

interface CommentListWidgetProps {
  postId: string
}

const CommentListWidget: FC<CommentListWidgetProps> = ({ postId }) => {
  const [content, setContent] = useState<string>('')
  const [commentList, setCommentList] = useState<Comment[]>([])

  const { id: loggedInUserId } = useAppSelector((state) => state.user.entity!)

  const changeContent = (e: ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value)
  }

  const postComment = async () => {
    const response = await addComment({ postId, userId: loggedInUserId, content })
    if (!response) return
    setContent('')
    setCommentList(response.comments)
  }

  useEffect(() => {
    const patchCommentList = async () => {
      const response = await getCommentList({ postId })
      if (!response) return
      setCommentList(response.comments)
    }

    patchCommentList()
  }, [postId])

  return (
    <CommentListWidgetLayout>
      <EditCommentBox>
        <Input value={content} onChange={changeContent} />
        <Button onClick={postComment}>등록</Button>
      </EditCommentBox>
      <CommentListBox>
        {commentList?.map((comment, index) => <CommentWidget key={index} {...comment} />)}
      </CommentListBox>
    </CommentListWidgetLayout>
  )
}

export default CommentListWidget

const CommentListWidgetLayout = styled.div`
  padding: 16px 8px 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    width: fit-content;
    white-space: nowrap;
  }
`

const EditCommentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  input {
    padding: 8px;
  }
`

const CommentListBox = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
`
