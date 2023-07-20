import express from 'express';
import dotenv from 'dotenv';
import todosRoutes from './routes/todos.routes';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
// Middlewares
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/todos', todosRoutes);

// Database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    app.listen(PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
