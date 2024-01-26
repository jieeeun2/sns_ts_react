import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'store'
import PostWidget from 'components/home/PostWidget'
import NoContentWidget from 'components/home/NoContentWidget'
import { getPosts } from 'store/thunks/postThunks'

const PostListWidget = () => {
  const dispatch = useAppDispatch()
  const postList = useAppSelector((state) => state.posts.entities)

  const getAllPostList = async () => {
    dispatch(getPosts())
  }

  useEffect(() => {
    getAllPostList()
  }, [])

  return (
    <PostListWidgetLayout>
      {postList?.length > 0 ? (
        postList
          .slice(0)
          .reverse()
          .map((post) => <PostWidget key={post.id} {...post} />)
      ) : (
        <NoContentWidget />
      )}
    </PostListWidgetLayout>
  )
}

export default PostListWidget

const PostListWidgetLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`
