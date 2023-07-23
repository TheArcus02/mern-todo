import { Request, Response } from 'express'
import User from '../models/userModel'

const loginUser = async (req: Request, res: Response) => {
  res.json({ message: 'Login user' })
}

const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)
    res.status(200).json({ email, user })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export { loginUser, signupUser }
