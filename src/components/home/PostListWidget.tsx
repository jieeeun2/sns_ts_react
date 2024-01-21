import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { postApi } from 'apis/postApi'
import { RootState } from 'store'
import { setPosts } from 'store/postsSlice'
import PostWidget from 'components/home/PostWidget'
import NoContentWidget from 'components/home/NoContentWidget'

const PostListWidget = () => {
  const dispatch = useDispatch()
  const postList = useSelector((state: RootState) => state.posts.posts)

  const getAllPostList = async () => {
    const getAllPostListResult = await postApi.getAllPostList()

    dispatch(setPosts({ posts: getAllPostListResult.data }))
  }

  useEffect(() => {
    getAllPostList()
  }, [])

  return (
    <PostListWidgetLayout>
      {postList.length > 0 ? (
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
