import { Schema, model } from 'mongoose'
import { TodoInterface } from '../interfaces/interfaces'

const todoSchema = new Schema<TodoInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const Todo = model('Todo', todoSchema)
export default Todo
