import { ChangeEvent, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import {
  MdOutlineImage,
  MdOutlineVideoCameraBack,
  MdOutlineAttachFile,
  MdOutlineMicNone,
} from 'react-icons/md'
import {
  Button,
  FlexBetween,
  Hr,
  IconButton,
  Textarea,
  WidgetLayout,
} from 'styles/ReuseableComponent'
import { PostInputValue } from 'types/postType'
import UploadImage from 'components/common/UploadImage'

const PostingWidget = () => {
  const [inputValue, setInputValue] = useState<PostInputValue>({ content: '', images: [] })
  const [isImageEditable, setIsImageEditable] = useState<boolean>(false)

  const changeInputValue = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const editImage = () => {
    setIsImageEditable((prev) => !prev)
  }

  const changeImages = (newImages: File[]) => {
    setInputValue((prev) => ({ ...prev, images: newImages }))
  }

  return (
    <PostingWidgetLayout>
      <ContentBox>
        <img src='/images/profileImage.jpg' />
        <Textarea
          onChange={changeInputValue}
          name='content'
          placeholder='오늘 무슨일이 있었나요!'
          spellCheck='false'
        />
      </ContentBox>
      <Hr />
      <AttachmentAndSubmitBox>
        <AttachmentSection>
          <IconButton onClick={editImage}>
            <MdOutlineImage className='icon' />
            <span>이미지</span>
          </IconButton>
          <IconButton>
            <MdOutlineVideoCameraBack className='icon' />
            <span>동영상</span>
          </IconButton>
          <IconButton>
            <MdOutlineAttachFile className='icon' />
            <span>첨부파일</span>
          </IconButton>
          <IconButton>
            <MdOutlineMicNone className='icon' />
            <span>음성녹음</span>
          </IconButton>
        </AttachmentSection>
        <Button>등록</Button>
      </AttachmentAndSubmitBox>
      {isImageEditable && <UploadImage images={inputValue.images} changeImages={changeImages} />}
    </PostingWidgetLayout>
  )
}

export default PostingWidget

const PostingWidgetLayout = styled(WidgetLayout)`
  width: 500px;
  box-sizing: border-box;

  & > div {
    margin: 12px;
  }

  .icon {
    font-size: 24px;
  }
`

const ContentBox = styled(FlexBetween)`
  gap: 12px;

  & > img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-top: 0;
    margin-bottom: auto;
  }
`

const AttachmentAndSubmitBox = styled(FlexBetween)`
  & > button {
    height: 36px;
    background: ${({ theme }) => theme.primary.light};
    color: ${({ theme }) => theme.primary.main};
  }
`

const AttachmentSection = styled.div`
  display: flex;
  gap: 12px;

  & > button {
    height: 36px;
  }
`
