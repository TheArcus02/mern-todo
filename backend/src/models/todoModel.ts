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
  },
  { timestamps: true },
)

const Todo = model('Todo', todoSchema)
export default Todo
