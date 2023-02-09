import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).send(`no post with id: ${id}`);
  }
};

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 8;
    // Get the start index of the page:
    // The very first index of all the posts is 0 (because of the ARRAY indexing).
    const startIndex = (Number(page) - 1) * LIMIT;
    //Count all the posts in the database.
    const total = await PostMessage.countDocuments();
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: page,
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const getPostsByBookmark = async (req, res) => {
  const user = req.userId;

  try {
    const postsBookmarkedByTheUser = await PostMessage.find({ bookmark: user });
    res.status(200).json(postsBookmarkedByTheUser);
  } catch (error) {
    console.log(error);
  }
};

export const getPostsBySearch = async (req, res) => {
  const { keyword } = req.query;
  const rgx = (pattern) => new RegExp(`.*${pattern}.*`);
  const keywordInRegExpForm = rgx(keyword);

  try {
    const matchPosts = await PostMessage.find({
      $or: [
        { name: { $regex: keywordInRegExpForm, $options: 'i' } },
        { title: { $regex: keywordInRegExpForm, $options: 'i' } },
        { message: { $regex: keywordInRegExpForm, $options: 'i' } },
        { tags: { $regex: keywordInRegExpForm, $options: 'i' } },
      ],
    });

    res.status(200).json(matchPosts);
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  const newPost = new PostMessage({ ...body, creator: req.userId });

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const createPostComment = async (req, res) => {
  const { id } = req.params;
  const { body, creator } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ msg: 'Post cannot be found.' });

  const post = await PostMessage.findById(id);

  post.comments.push({
    body,
    creator: creator.name,
    date: new Date(),
  });

  const commentedPost = await PostMessage.findByIdAndUpdate(
    id,
    { comments: post.comments },
    { new: true }
  );

  res.json(commentedPost);
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { selectedFile, message, title, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { selectedFile, message, title, tags },
    { new: true }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const { creator } = await PostMessage.findById(id);

  if (creator !== userId)
    return res.status(204).json({ msg: 'not the creator of the post' });

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully.' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id).select({ _id: 1, likes: 1 });
  const alreadyLiked = post.likes.indexOf(req.userId);

  if (alreadyLiked + 1) {
    post.likes.splice(alreadyLiked, 1);
  } else {
    post.likes.push(req.userId);
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  }).select({ _id: 1, likes: 1 });

  const { _id, likes } = updatedPost;

  res.json({ _id, likes });
};

export const bookmarkPost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const { bookmark } = await PostMessage.findById(id).select({ bookmark: 1 });
  const alreadyBookmarked = bookmark.indexOf(req.userId);

  if (alreadyBookmarked + 1) {
    bookmark.splice(alreadyBookmarked, 1);
  } else {
    bookmark.push(req.userId);
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { bookmark: bookmark },
    { new: true }
  ).select({ _id: 1, bookmark: 1 });

  res.json(updatedPost);
};
