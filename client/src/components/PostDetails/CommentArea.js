import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { createPostComment } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import { Typography, Box, Grid, Avatar } from '@mui/material';
import Loading from '../Loading';
import ForumIcon from '@mui/icons-material/Forum';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const commentStyle = {
  title: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    // mb: '1rem',
  },

  perCommentBox: {
    display: 'flex',
    mt: '1rem',
    flexDirection: 'revert',
  },
};

const Comment = ({ postId, comments, isLoadingComments }) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const onWiderScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const user = JSON.parse(localStorage.getItem('profile'));
  const [openComment, setOpenComment] = useState(onWiderScreen);
  const [commentPackage, setCommentPackage] = useState({ body: '' });

  const commentCreator = localStorage?.getItem('profile')
    ? JSON.parse(localStorage.getItem('profile'))?.result
    : { name: 'Guest', email: 'Guest@gmail.com' };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!commentPackage?.body) alert('say something at least');
    dispatch(
      createPostComment(postId, { ...commentPackage, creator: commentCreator })
    );
    setCommentPackage({ body: '' });
  };

  const handleCommentContentChange = (e) =>
    setCommentPackage({ body: e.target.value });

  useEffect(() => setOpenComment(onWiderScreen), [onWiderScreen]);

  //
  //
  // debounce
  //
  //
  return (
    <>
      <Box>
        <Accordion
          expanded={openComment}
          onChange={() => setOpenComment((pre) => !pre)}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6" sx={{ ...commentStyle.title }}>
              <ForumIcon fontSize="medium" /> &nbsp;
              {comments && comments.length > 1 ? (
                <>{comments.length}&nbsp;Comments</>
              ) : (
                <>{comments?.length}&nbsp;Comment</>
              )}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
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
                      size="small"
                      sx={{ mr: '1rem' }}
                      onClick={() => setCommentPackage({ body: '' })}
                    >
                      CANCEL
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="small"
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
                    comments.map((comment) => {
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
          </AccordionDetails>
        </Accordion>
      </Box>
    </>
  );
};

export default Comment;
