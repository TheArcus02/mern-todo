import express from 'express'
import dotenv from 'dotenv'
import todosRoutes from './routes/todos.routes'
import userRoutes from './routes/user.routes'
import mongoose from 'mongoose'
import cors from 'cors'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// Routes
app.use('/api/todos', todosRoutes)
app.use('/api/user', userRoutes)

// Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database')
    app.listen(PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`)
    })
  })
  .catch((err) => {
    console.log(err)
  })
