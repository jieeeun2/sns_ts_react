export interface User {
  id: string
  name: string
  email: string
  password: string
  profileImagePath: string
  followers: Friend[]
  followings: Friend[]
  location: string
  occupation: string
  numberOfVisitorsToday: number
  totalNumberOfVisitors: number
}

interface Friend {
  id: string
  name: string
  profileImagePath: string
  location: string
}
