import { Request, Response } from 'express'
import User from '../models/userModel'
import jwt from 'jsonwebtoken'

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)
    const { _id } = user
    const token = jwt.sign({ _id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const signupUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const user = await User.signup(email, password)
    const { _id } = user
    const token = jwt.sign({ _id }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    })

    res.status(200).json({ email, token })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export { loginUser, signupUser }
