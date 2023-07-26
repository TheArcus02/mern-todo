import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from '../controllers/todoController'
import requireAuth from '../middleware/requireAuth'

const router = Router()
router.use(requireAuth)

router.get('/', getTodos)
router.get('/:id', getTodo)
router.post('/', createTodo)
router.delete('/:id', deleteTodo)
router.patch('/:id', updateTodo)

export default router
