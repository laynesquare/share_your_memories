import mongoose from 'mongoose';

import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
  const { page } = req.query; //It's a string.

  try {
    const LIMIT = 8;
    // Get the start index of the page:
    // The very first index of all the posts is 0 (because of the ARRAY indexing).
    const startIndex = (Number(page) - 1) * LIMIT;
    //Count all the posts in the database.
    const total = await PostMessage.countDocuments();

    console.log(total);
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: page,
      //Unconditional roundup.
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ msg: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body; //req equals to "newpost" sent from front-end
  console.log(body);
  const newPost = new PostMessage({ ...body, creator: req.userId });

  //body per se is an object.
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ msg: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags, likes, name, _id } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = {
    creator,
    title,
    message,
    tags,
    selectedFile,
    likes,
    name,
    _id: id,
  };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post deleted successfully.' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  //checking if the user has already liked the post
  const post = await PostMessage.findById(id);
  const alreadyLiked = post.likes.find((user) => {
    return user === req.userId;
  });

  if (alreadyLiked) {
    console.log('executed');
    post.likes = post.likes.filter((user) => {
      return user !== req.userId;
    });
    console.log(post);
  } else {
    post.likes.push(req.userId);
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};