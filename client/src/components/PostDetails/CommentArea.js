import { useState } from 'react';
import { TextField } from '@mui/material';

const Comment = () => {
  const [commentContents, setCommentContent] = useState('');
  return <TextField>Comment</TextField>;
};

export default Comment;
