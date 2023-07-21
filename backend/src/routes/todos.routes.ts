import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from '../controllers/todoController'

const router = Router()

router.get('/', getTodos)
router.get('/:id', getTodo)
router.post('/', createTodo)
router.delete('/:id', deleteTodo)
router.patch('/:id', updateTodo)

export default router
