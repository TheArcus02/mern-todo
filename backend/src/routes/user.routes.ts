import { Router } from 'express'
import { loginUser, signupUser } from '../controllers/userController'

const router = Router()

router.post('/login', loginUser)
router.post('/signup', signupUser)

export default router
