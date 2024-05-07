import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import {
  MdOutlineFavorite,
  MdOutlineFavoriteBorder,
  MdOutlineChatBubbleOutline,
} from 'react-icons/md'
import { AiOutlineExport } from 'react-icons/ai'
import { Button, IconButton, Span, WidgetLayout } from 'styles/ReuseableComponent'
import Profile from 'components/common/Profile'
import UploadImage from 'components/common/UploadImage'
import CommentListWidget from 'components/home/CommentListWidget'
import DynamicHeightTextarea from 'components/element/DynamicHeightTextarea'
import { Post, UpdatePostInputValue } from 'types/postType'
import { useAppDispatch, useAppSelector } from 'store'
import { deletePostThunk, modifyLikeThunk, updatePostThunk } from 'store/thunks/postThunks'
import useTimeAgo from 'hooks/useTimeAgo'

const PostWidget: FC<Post> = ({
  id,
  userId,
  name,
  profileImagePath,
  location,
  content,
  imagePaths,
  likes,
  numberOfComments,
  createdAt,
  updatedAt,
}) => {
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<UpdatePostInputValue>({
    content,
    imagesToAdd: [],
    existingImagePaths: imagePaths,
    imagePathsToDelete: [],
  })
  const [isCommentVisible, setIsCommentVisible] = useState<boolean>(false)

  useEffect(() => {
    if (!isUpdateMode) return

    setInputValue({
      content,
      imagesToAdd: [],
      existingImagePaths: imagePaths,
      imagePathsToDelete: [],
    })
  }, [isUpdateMode, content, imagePaths])

  const { id: loggedInUserId } = useAppSelector((state) => state.user.entity!)
  const dispatch = useAppDispatch()

  const { timeAgo, isTimeAgoMode, previousTime, toggleTimeMode } = useTimeAgo(createdAt)

  const isLiked = likes[loggedInUserId]
  const numberOfLikes = Object.keys(likes).length

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

  const patchLike = () => {
    dispatch(modifyLikeThunk({ postId: id, userId: loggedInUserId }))
  }

  const showComment = () => {
    setIsCommentVisible((prev) => !prev)
  }

  const profileComponentProps = { isPostWidget: true, id: userId, profileImagePath, name, location }

  return (
    <PostWidgetLayout>
      <Profile {...profileComponentProps} />
      <ContentBox>
        {loggedInUserId === userId && (
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
        )}
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
          <div>
            <Span onClick={toggleTimeMode} className='timeAgo'>
              {isTimeAgoMode ? timeAgo : previousTime.toLocaleString()}
            </Span>
            {createdAt !== updatedAt && <Span>(수정됨)</Span>}
          </div>
        </ContentSection>
        <ReactionSection>
          <IconButton onClick={patchLike} className='like'>
            {isLiked ? (
              <MdOutlineFavorite className='icon fill' />
            ) : (
              <MdOutlineFavoriteBorder className='icon' />
            )}
            <span>{numberOfLikes}</span>
          </IconButton>
          <IconButton onClick={showComment} className='comment'>
            <MdOutlineChatBubbleOutline className='icon' />
            <span>{numberOfComments}</span>
          </IconButton>
          <IconButton className='share'>
            <AiOutlineExport className='icon' />
          </IconButton>
        </ReactionSection>
      </ContentBox>
      {isCommentVisible && <CommentListWidget postId={id} />}
    </PostWidgetLayout>
  )
}

export default PostWidget

const PostWidgetLayout = styled(WidgetLayout)`
  width: 100%;
  box-sizing: border-box;
  position: relative;

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

  div {
    margin-left: auto;
    margin-right: 12px;
    display: flex;
    gap: 4px;

    & > span.timeAgo {
      cursor: pointer;
    }
  }
`

const ReactionSection = styled.div`
  display: flex;
  gap: 12px;
  position: relative;

  & > button {
    background: none;
    gap: 4px;

    &.like > .icon.fill {
      color: ${({ theme }) => theme.primary.main};
    }

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
