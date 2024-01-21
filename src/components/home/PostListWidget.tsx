import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { postApi } from 'apis/postApi'
import { setPosts } from 'store/postsSlice'
import PostWidget from 'components/home/PostWidget'

const PostListWidget = () => {
  const dispatch = useDispatch()

  const getAllPostList = async () => {
    const getAllPostListResult = await postApi.getAllPostList()

    dispatch(setPosts({ posts: getAllPostListResult.data }))
  }

  useEffect(() => {
    getAllPostList()
  }, [])

  return <PostWidget />
}

export default PostListWidget
