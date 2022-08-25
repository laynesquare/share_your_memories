import express from 'express';
import {
  getPosts,
  createPost,
  createPostComment,
  updatePost,
  deletePost,
  likePost,
  getPost,
} from '../controllers/posts.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPost);
router.post('/', auth, createPost);
router.patch('/:id/createPostComment', createPostComment);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

export default router;
