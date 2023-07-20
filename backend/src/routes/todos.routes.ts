import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'GET all posts' });
});

router.get('/:id', (req, res) => {
  res.json({ message: 'GET a single post' });
});

router.post('/', (req, res) => {
  res.json({ message: 'POST a post' });
});

router.delete('/:id', (req, res) => {
  res.json({ message: 'DELETE a post' });
});

router.patch('/:id', (req, res) => {
  res.json({ message: 'PATCH a post' });
});

export default router;
