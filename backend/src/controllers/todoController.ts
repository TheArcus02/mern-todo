import express from 'express'
import { TodoInterface } from '../interfaces/interfaces'
import Todo from '../models/todoModel'
import mongoose from 'mongoose'

const getTodos = async (req: express.Request, res: express.Response) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 })
    res.status(200).json(todos)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getTodo = async (req: express.Request, res: express.Response) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ message: 'Todo not found' })
  }

  const todo = await Todo.findById(id)

  if (!todo) {
    res.status(404).json({ message: 'Todo not found' })
  }

  res.status(200).json(todo)
}

const createTodo = async (req: express.Request, res: express.Response) => {
  const { title, description, completed } = req.body as TodoInterface
  try {
    const todo = await Todo.create({
      title,
      description,
      completed,
    })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteTodo = async (req: express.Request, res: express.Response) => {}

const updateTodo = async (req: express.Request, res: express.Response) => {}

export { getTodos, getTodo, createTodo }
