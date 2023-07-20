import express from 'express'
import { Router } from 'express'
import { createTodo, getTodo, getTodos } from '../controllers/todoController'

const router = Router()

router.get('/', getTodos)
router.get('/:id', getTodo)
router.post('/', createTodo)

router.delete('/:id', (req: express.Request, res: express.Response) => {
  res.json({ message: 'DELETE a post' })
})

router.patch('/:id', (req: express.Request, res: express.Response) => {
  res.json({ message: 'PATCH a post' })
})

export default router
