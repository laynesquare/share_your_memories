import { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createPostComment } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import Loading from '../Loading';
import ForumIcon from '@mui/icons-material/Forum';
import moment from 'moment';

const commentStyle = {
  title: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    mb: '1rem',
  },

  perCommentBox: {
    display: 'flex',
    mt: '1rem',
    flexDirection: 'revert',
  },
};

const Comment = ({ postId, comments, isLoadingComments }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const [commentPackage, setCommentPackage] = useState({
    body: '',
  });

  console.log(isLoadingComments);
  const commentCreator = localStorage?.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile'))?.result
    : { name: 'Guest', email: 'Guest@gmail.com' };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentPackage?.body) alert('say something at least');
    dispatch(
      createPostComment(postId, {
        ...commentPackage,
        creator: commentCreator,
      })
    );
    setCommentPackage({
      body: '',
    });
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
        <Typography variant="h5" sx={{ ...commentStyle.title }}>
          <ForumIcon fontSize="large" /> &nbsp;
          {comments && comments.length > 1 ? (
            <>{comments.length}&nbsp;Comments</>
          ) : (
            <>{comments?.length}&nbsp;Comment</>
          )}
        </Typography>

        <form autoComplete="off" onSubmit={handleSubmit}>
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
                  onClick={() => setCommentPackage({ body: '' })}
                >
                  CANCEL
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  disabled={!user?.result}
                >
                  COMMENT
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>

        {isLoadingComments ? (
          <Loading type="small" slightTopMargin />
        ) : (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
              {comments?.length ? (
                comments.map((comment, idx) => {
                  return (
                    <Box
                      key={comment?._id}
                      sx={{ ...commentStyle.perCommentBox }}
                    >
                      <Box sx={{ flexBasis: '50px', flexShrink: '0' }}>
                        <Avatar>{comment?.creator[0]}</Avatar>
                      </Box>
                      <Box sx={{ flexGrow: '1' }}>
                        <Box sx={{ display: 'flex', flexWrap: 'nowrap' }}>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            {comment?.creator || 'Guest'}
                          </Typography>
                          &nbsp; &nbsp;
                          <Typography variant="h8">{`${moment(
                            comment?.date
                          ).fromNow()}`}</Typography>
                        </Box>
                        <Typography sx={{ maxWidth: '100%' }}>
                          {comment?.body}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })
              ) : (
                <></>
              )}
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Comment;
