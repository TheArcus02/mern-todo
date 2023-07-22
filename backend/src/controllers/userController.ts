import { Request, Response } from 'express'
import User from '../models/userModel'

const loginUser = async (req: Request, res: Response) => {
  res.json({ message: 'Login user' })
}

const signupUser = async (req: Request, res: Response) => {
  res.json({ message: 'Signup user' })
}

export { loginUser, signupUser }
