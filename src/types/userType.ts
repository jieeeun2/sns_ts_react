export interface User {
  id: string
  name: string
  profileImagePath: string
  friends: Friend[]
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
