import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import User from '../models/userModel'

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ message: 'You must be logged in' })
  }

  const token = authorization.replace('Bearer ', '')

  try {
    const { _id } = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload

    req.user = await User.findById(_id).select('_id')
    next()
  } catch (error) {
    return res.status(401).json({ message: 'You must be logged in' })
  }
}

export default requireAuth
