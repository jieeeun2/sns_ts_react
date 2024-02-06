import { FC, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import { MdOutlineFavoriteBorder, MdOutlineChatBubbleOutline } from 'react-icons/md'
import { AiOutlineExport } from 'react-icons/ai'
import { Button, IconButton, Textarea, WidgetLayout } from 'styles/ReuseableComponent'
import Profile from 'components/common/Profile'
import { Post, UpdatePostInputValue } from 'types/postType'

const PostWidget: FC<Post> = ({
  id,
  userId, //TODO: Profile위젯으로 넘겨주기
  name, //TODO: Profile위젯으로 넘겨주기
  profileImagePath, //TODO: Profile위젯으로 넘겨주기
  location, //TODO: Profile위젯으로 넘겨주기
  content,
  imagePaths,
  numberOfLikes,
  numberOfComments,
  createdAt, //사용X ???
  updatedAt, //TODO: 몇시간전, 몇일전 .. 이런형식으로 바꿔주기
}) => {
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<UpdatePostInputValue>({
    content,
    images: [],
    imagePaths,
  })

  const changeUpdateMode = () => {
    setIsUpdateMode(true)
  }

  const changeInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const updatePost = () => {}

  const cancel = () => {
    setIsUpdateMode(false)
    setInputValue({ content, images: [], imagePaths })
  }

  const deletePost = () => {}

  return (
    <PostWidgetLayout>
      <Profile />
      <ContentBox>
        <UpdateAndDeleteSection>
          {!isUpdateMode ? (
            <>
              <Button onClick={changeUpdateMode}>수정</Button>
              <Button onClick={deletePost}>삭제</Button>
            </>
          ) : (
            <>
              <Button onClick={updatePost}>수정완료</Button>
              <Button onClick={cancel}>취소</Button>
            </>
          )}
        </UpdateAndDeleteSection>
        <ContentSection>
          <Textarea
            name='content'
            value={inputValue.content}
            onChange={changeInputValue}
            readOnly={!isUpdateMode}
            spellCheck='false'
          />
          {imagePaths?.map((imagePath, index) => <img key={index} src={imagePath} />)}
        </ContentSection>
        <ReactionSection>
          <IconButton className='like'>
            <MdOutlineFavoriteBorder className='icon' />
            <span>{numberOfLikes}</span>
          </IconButton>
          <IconButton className='comment'>
            <MdOutlineChatBubbleOutline className='icon' />
            <span>{numberOfComments}</span>
          </IconButton>
          <IconButton className='share'>
            <AiOutlineExport className='icon' />
          </IconButton>
        </ReactionSection>
      </ContentBox>
    </PostWidgetLayout>
  )
}

export default PostWidget

const PostWidgetLayout = styled(WidgetLayout)`
  width: 500px;
  box-sizing: border-box;
  position: relative;

  & > div {
    margin: 12px;
  }

  .icon {
    font-size: 22px;
  }
`

const ContentBox = styled.div``

const UpdateAndDeleteSection = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  gap: 8px;
  margin: 28px 20px;

  button {
    width: fit-content;
    white-space: nowrap;
  }
`

const ContentSection = styled.div`
  textarea {
    width: 100%;
    box-sizing: border-box;
  }

  textarea[readOnly] {
    background: transparent;
  }

  img {
    width: 100%;
  }
`

const ReactionSection = styled.div`
  display: flex;
  gap: 12px;
  position: relative;

  & > button {
    background: none;
    gap: 4px;

    &.share {
      position: absolute;
      right: 0;
    }

    &:hover {
      background: none;
      color: inherit;
    }
  }
`
