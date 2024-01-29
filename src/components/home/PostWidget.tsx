import { FC } from 'react'
import styled from 'styled-components'
import { MdOutlineFavoriteBorder, MdOutlineChatBubbleOutline } from 'react-icons/md'
import { AiOutlineExport } from 'react-icons/ai'
import { IconButton, Textarea, WidgetLayout } from 'styles/ReuseableComponent'
import Profile from 'components/common/Profile'
import { Post } from 'types/postType'

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
  return (
    <PostWidgetLayout>
      <Profile />
      <ContentBox>
        <Textarea value={content} readOnly />
        {imagePaths?.map((imagePath, index) => <img key={index} src={imagePath} />)}
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
