import express from 'express'
import { TodoInterface } from '../interfaces/interfaces'
import Todo from '../models/todoModel'
import mongoose from 'mongoose'

const getTodos = async (req: express.Request, res: express.Response) => {
  try {
    const todos = await Todo.find()
      .where({
        user_id: req.user?._id,
      })
      .sort({ createdAt: -1 })
    return res.status(200).json(todos)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const getTodo = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    const todo = await Todo.findById(id)

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    return res.status(200).json(todo)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const createTodo = async (req: express.Request, res: express.Response) => {
  try {
    const user_id = req.user?._id
    const { title, description, completed } = req.body as TodoInterface
    const todo = await Todo.create({
      title,
      description,
      completed,
      user_id,
    })
    res.status(200).json(todo)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const deleteTodo = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    const todo = await Todo.findByIdAndDelete(id)

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }
    return res.status(200).json(todo)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

const updateTodo = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    const todo = await Todo.findByIdAndUpdate(id, {
      ...(req.body as TodoInterface),
    })

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' })
    }

    return res.status(200).json(todo)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

export { getTodos, getTodo, createTodo, deleteTodo, updateTodo }
