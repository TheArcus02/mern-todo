import { Model, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { UserInterface } from '../interfaces/interfaces'
import validator from 'validator'

interface UserModelInterface extends Model<UserInterface> {
  signup(email: string, password: string): Promise<UserInterface>
}

const userSchema = new Schema<UserInterface, UserModelInterface>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.static('signup', async function (email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required')
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email is invalid')
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      'Password is invalid. It must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, 1 number and 1 symbol',
    )
  }

  const exists = await this.findOne({ email })

  if (exists) {
    throw new Error('Email already exists')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  const user = await this.create({ email, password: hash })

  return user
})

const User = model<UserInterface, UserModelInterface>('User', userSchema)

export default User
