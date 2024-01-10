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

const PostingWidget = () => {
  return (
    <PostingWidgetLayout>
      <ContentBox>
        <img src='/images/profileImage.jpg' />
        <Textarea placeholder='오늘 무슨일이 있었나요!' spellCheck='false' />
      </ContentBox>
      <Hr />
      <AttachmentAndSubmitBox>
        <AttachmentSection>
          <IconButton>
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
