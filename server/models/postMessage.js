import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  title: String,
  name: String,
  message: String,
  creator: String,
  tags: [String],
  selectedFile: String,
  likes: { type: [String], default: [] },
  comments: [{ body: String, date: Date }],
  createdAt: { type: Date, default: new Date() },
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;
