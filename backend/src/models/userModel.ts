import { Model, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'
import { DbUserInterface, UserInterface } from '../interfaces/interfaces'
import validator from 'validator'

interface UserModelInterface extends Model<UserInterface> {
  signup(email: string, password: string): Promise<DbUserInterface>
  login(email: string, password: string): Promise<DbUserInterface>
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

// Statics
userSchema.static('signup', async function (email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required')
  }
  if (!validator.isEmail(email)) {
    throw new Error('Email is invalid')
  }
  if (
    !validator.isStrongPassword(password, {
      minLength: 6,
      minUppercase: 1,
      minNumbers: 1,
    })
  ) {
    throw new Error(
      'Password is invalid. It must contain at least 6 characters, 1 uppercase letter and 1 number',
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

userSchema.static('login', async function (email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email and password are required')
  }
  const user: DbUserInterface = await this.findOne({ email })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('Invalid credentials')
  }
  return user
})

const User = model<UserInterface, UserModelInterface>('User', userSchema)

export default User
