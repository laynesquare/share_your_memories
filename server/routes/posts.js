import express from 'express';

import {
  getPostsByBookmark,
  createPostComment,
  getPostsBySearch,
  bookmarkPost,
  createPost,
  updatePost,
  deletePost,
  getPosts,
  likePost,
  getPost,
} from '../controllers/posts.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/detail/:id', getPost);
router.get('/search/', getPostsBySearch);
router.get('/bookmark/', auth, getPostsByBookmark);
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.patch('/:id/createPostComment', createPostComment);
router.patch('/:id/bookmark', auth, bookmarkPost);
router.patch('/:id/likePost', auth, likePost);
router.delete('/:id', auth, deletePost);

export default router;
