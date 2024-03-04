import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdOutlineFavoriteBorder, MdOutlineChatBubbleOutline } from 'react-icons/md'
import { AiOutlineExport } from 'react-icons/ai'
import { Button, IconButton, WidgetLayout } from 'styles/ReuseableComponent'
import Profile from 'components/common/Profile'
import UploadImage from 'components/common/UploadImage'
import DynamicHeightTextarea from 'components/common/DynamicHeightTextarea'
import { Post, UpdatePostInputValue } from 'types/postType'
import { useAppDispatch } from 'store'
import { deletePostThunk, updatePostThunk } from 'store/thunks/postThunks'

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
    imagesToAdd: [],
    existingImagePaths: imagePaths,
    imagePathsToDelete: [],
  })

  useEffect(() => {
    if (!isUpdateMode) return

    setInputValue({
      content,
      imagesToAdd: [],
      existingImagePaths: imagePaths,
      imagePathsToDelete: [],
    })
  }, [isUpdateMode, content, imagePaths])

  const dispatch = useAppDispatch()

  const changeUpdateMode = () => {
    setIsUpdateMode(true)
  }

  const changeContent = (newContent: string) => {
    setInputValue((prev) => ({ ...prev, content: newContent }))
  }

  const changeImages = ({
    newImages,
    newExistingImagePaths,
    newImagePathsToDelete,
  }: {
    newImages?: File[]
    newExistingImagePaths?: string[]
    newImagePathsToDelete?: string[]
  }) => {
    setInputValue((prev) => ({
      ...prev,
      imagesToAdd: newImages || prev.imagesToAdd,
      existingImagePaths: newExistingImagePaths || prev.existingImagePaths,
      imagePathsToDelete: newImagePathsToDelete || prev.imagePathsToDelete,
    }))
  }

  const updatePost = () => {
    const { content, imagesToAdd, imagePathsToDelete } = inputValue

    dispatch(updatePostThunk({ postId: id, content, imagesToAdd, imagePathsToDelete })).then(() =>
      setIsUpdateMode(false),
    )
  }

  const cancel = () => {
    setIsUpdateMode(false)
  }

  const deletePost = () => {
    dispatch(deletePostThunk({ postId: id }))
  }

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
          <DynamicHeightTextarea
            text={inputValue.content}
            changeText={changeContent}
            readOnly={!isUpdateMode}
          />
          <>
            {!isUpdateMode ? (
              <>{imagePaths?.map((imagePath, index) => <img key={index} src={imagePath} />)}</>
            ) : (
              <UploadImage
                isUpdateMode={isUpdateMode}
                images={inputValue.imagesToAdd}
                existingImagePaths={inputValue.existingImagePaths}
                imagePathsToDelete={inputValue.imagePathsToDelete}
                changeImages={changeImages}
              />
            )}
          </>
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

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

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
  display: flex;
  flex-direction: column;
  gap: 12px;

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
