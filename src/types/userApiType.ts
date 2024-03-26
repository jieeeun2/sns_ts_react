export interface GetUserInfo {
  userId: string
}

export interface UpdateFollowingList {
  userId: string
  targetUserId: string
}
