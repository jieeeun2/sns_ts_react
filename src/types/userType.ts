export interface User {
  id: string
  name: string
  email: string
  password: string
  profileImagePath: string
  friends: string[]
  location: string
  occupation: string
  numberOfVisitorsToday: number
  totalNumberOfVisitors: number
}
