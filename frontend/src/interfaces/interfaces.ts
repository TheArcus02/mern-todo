export interface TodoInterface {
  _id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

export interface UserInterface {
  email: string
  token: string
}
