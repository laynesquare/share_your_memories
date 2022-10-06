import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createPostComment } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';

import moment from 'moment';

const Comment = ({ postId, comments }) => {
  const dispatch = useDispatch();
  const commentCreator = localStorage?.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile'))?.result
    : { name: 'Guest', email: 'Guest@gmail.com' };

  const [commentPackage, setCommentPackage] = useState({
    body: '',
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
      <Box>
        <Typography
          variant="h5"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'bold',
            mb: '1rem',
          }}
        >
          <ForumIcon fontSize="large" /> &nbsp;
          {comments && comments.length > 1 ? (
            <>{comments.length}&nbsp;Comments</>
          ) : (
            <>{comments?.length}&nbsp;Comment</>
          )}
        </Typography>

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
                value={commentPackage.body}
                onChange={handleCommentContentChange}
                sx={{ mb: '1rem' }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Button
                  size="large"
                  sx={{ mr: '1rem' }}
                  onClick={() => {
                    setCommentPackage({ body: '' });
                  }}
                >
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
        <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
          {comments?.length
            ? comments.map((comment, idx) => {
                return (
                  <Box
                    key={comment?._id}
                    sx={{
                      display: 'flex',
                      mt: '1rem',
                      flexDirection: 'revert',
                    }}
                  >
                    <Box sx={{ flexBasis: '50px', flexShrink: '0' }}>
                      <Avatar>{comment?.creator[0]}</Avatar>
                    </Box>
                    <Box sx={{ flexGrow: '1', flexShrink: '0' }}>
                      <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {comment?.creator || 'Guest'}
                        </Typography>
                        &nbsp; &nbsp;
                        <Typography>{`${moment().fromNow(
                          comment.date
                        )} ago`}</Typography>
                      </Box>
                      <Typography>{comment?.body}</Typography>
                    </Box>
                  </Box>
                );
              })
            : 'Be the first one to comment.'}
        </Box>
      </Box>
    </>
  );
};

export default Comment;
