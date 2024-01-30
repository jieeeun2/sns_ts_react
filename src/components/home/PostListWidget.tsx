import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from 'store'
import { getPostsThunk } from 'store/thunks/postThunks'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import PostWidget from 'components/home/PostWidget'
import NoContentWidget from 'components/home/NoContentWidget'

const PostListWidget = () => {
  const dispatch = useAppDispatch()
  const { entities: postList, hasNextPage } = useAppSelector((state) => state.posts)

  useEffect(() => {
    if (postList.length === 0) dispatch(getPostsThunk())
  }, [])

  const { lastElementRef } = useInfiniteScroll<HTMLLIElement>(
    () => hasNextPage && dispatch(getPostsThunk()),
  )

  return (
    <PostListWidgetLayout>
      {postList.length > 0 ? (
        postList?.map((post, index) => (
          <PostItemBox key={post.id} ref={index === postList.length - 1 ? lastElementRef : null}>
            <PostWidget {...post} />
          </PostItemBox>
        ))
      ) : (
        <NoContentWidget />
      )}
    </PostListWidgetLayout>
  )
}

export default PostListWidget

const PostListWidgetLayout = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  list-style: none;
  margin-top: 20px;
  padding: 0;
`

const PostItemBox = styled.li``
