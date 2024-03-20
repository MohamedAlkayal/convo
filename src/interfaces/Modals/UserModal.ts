export default interface User {
  _id: string
  username: string
  email: string
  phonenumber: string
  gender: 'male' | 'female'
  active: boolean
  profilePic?: string
  updatedAt: Date
  createdAt: Date
}
