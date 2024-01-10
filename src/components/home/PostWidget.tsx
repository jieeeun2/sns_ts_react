import styled from 'styled-components'
import { MdOutlineFavoriteBorder, MdOutlineChatBubbleOutline } from 'react-icons/md'
import { AiOutlineExport } from 'react-icons/ai'
import { IconButton, Textarea, WidgetLayout } from 'styles/ReuseableComponent'
import Profile from 'components/common/Profile'

const PostWidget = () => {
  return (
    <PostWidgetLayout>
      <Profile />
      <ContentBox>
        <Textarea readOnly />
        <ReactionSection>
          <IconButton className='like'>
            <MdOutlineFavoriteBorder className='icon' />
            <span>N</span>
          </IconButton>
          <IconButton className='comment'>
            <MdOutlineChatBubbleOutline className='icon' />
            <span>N</span>
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

  & > div {
    margin: 12px;
  }

  .icon {
    font-size: 22px;
  }
`

const ContentBox = styled.div`
  textarea {
    width: 100%;
    box-sizing: border-box;
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
