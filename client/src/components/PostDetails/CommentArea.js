import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createPostComment } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Grid, Avatar } from '@mui/material';
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
      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        // style={{ background: 'blue' }}
      >
        <Grid container sx={{ display: 'flex', flexWrap: 'nowrap' }}>
          <Grid item sx={{ mr: '1rem' }}>
            <Avatar />
          </Grid>
          <Grid item sx={{ flexGrow: 1 }}>
            <TextField
              type="text"
              variant="standard"
              placeholder="Add a comment"
              fullWidth
              onChange={handleCommentContentChange}
              sx={{ mb: '1rem' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button type="submit" size="large" sx={{ mr: '1rem' }}>
                CANCEL
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                COMMENT
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      {comments?.length
        ? comments.map((comment, idx) => {
            return (
              <Box key={comment?._id}>
                <Typography>{comment?.creator || 'Guest'}</Typography>
                <Typography>{comment?.body}</Typography>
                <Typography>{`${moment().fromNow(
                  comment.date
                )} ago`}</Typography>
              </Box>
            );
          })
        : 'There is not any comments yet'}
    </>
  );
};

export default Comment;
