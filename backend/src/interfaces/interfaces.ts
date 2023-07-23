export interface TodoInterface {
  title: string
  description: string
  completed?: boolean
}

export interface UserInterface {
  email: string
  password: string
}

export interface DbUserInterface extends UserInterface {
  _id: string
  __v: number
}
