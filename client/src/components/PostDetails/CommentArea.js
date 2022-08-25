import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createPostComment } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box } from '@mui/material';
import moment from 'moment';

const Comment = ({ postId, comments }) => {
  const dispatch = useDispatch();
  const commentCreator = localStorage?.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile'))?.result
    : { name: 'Guest', email: 'Guest@gmail.com' };

  const [commentPackage, setCommentPackage] = useState({
    body: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentPackage?.body) alert('say something at least');
    dispatch(
      createPostComment(postId, {
        ...commentPackage,
        creator: commentCreator,
      })
    );
  };

  const handleCommentContentChange = (e) => {
    setCommentPackage({ body: e.target.value });
  };
  //
  //
  // debounce
  //
  //
  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          type="text"
          variant="filled"
          label="Say something..."
          onChange={handleCommentContentChange}
        />
        <Button type="submit">Send</Button>
      </form>
      {comments.length !== 0 &&
        comments.map((comment, idx) => {
          return (
            <Box key={comment?._id}>
              <Typography>{comment?.creator || 'Guest'}</Typography>
              <Typography>{comment?.body}</Typography>
              <Typography>{`${moment().fromNow(comment.date)} ago`}</Typography>
            </Box>
          );
        })}
    </>
  );
};

export default Comment;
