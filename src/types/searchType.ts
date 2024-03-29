import { Post } from 'types/postType'
import { User } from 'types/userType'

export interface SearchResultType {
  users: User[]
  posts: Post[]
}
