import express from 'express';
import dotenv from 'dotenv';
import postsRoutes from './routes/posts.routes';

dotenv.config();

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/posts', postsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`);
});
