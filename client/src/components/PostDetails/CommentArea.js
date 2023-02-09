import {
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  Accordion,
  Button,
  Avatar,
  Grid,
  Box,
} from '@mui/material';
import { createPostComment } from '../../actions/posts';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import ForumIcon from '@mui/icons-material/Forum';
import Loading from '../Loading';
import moment from 'moment';

const Comment = ({ postId, comments, isLoadingComments }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const creator = user ? user.result : guest;
  const theme = useTheme();
  const onWiderScreen = useMediaQuery(theme.breakpoints.up('lg'));
  const [comment, setComment] = useState({ body: '' });
  const [openComment, setOpenComment] = useState(onWiderScreen);

  const handleCommentChange = (e) => setComment({ body: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment?.body) return;
    dispatch(createPostComment(postId, { ...comment, creator: creator }));
    setComment({ body: '' });
  };

  useEffect(() => {
    setOpenComment(onWiderScreen);
  }, [onWiderScreen]);

  return (
    <Box>
      <Accordion
        expanded={openComment}
        onChange={() => setOpenComment((p) => !p)}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="expand-comment-section"
          id="comment-section"
        >
          <Typography variant="h6" sx={{ ...commentStyle.title }}>
            <ForumIcon fontSize="medium" /> &nbsp;
            {comments && comments?.length > 1 ? (
              <>{comments?.length}&nbsp;Comments</>
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
                  value={comment.body}
                  onChange={handleCommentChange}
                  sx={{ mb: '1rem' }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                  <Button
                    size="small"
                    sx={{ mr: '1rem' }}
                    onClick={() => setComment({ body: '' })}
                  >
                    CANCEL
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                    disabled={!comment.body}
                  >
                    COMMENT
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>

          {isLoadingComments && <Loading type="small" slightTopMargin />}

          {comments?.length > 0 &&
            comments.map((comment) => (
              <Box key={comment?._id} sx={{ ...commentStyle.perCommentBox }}>
                <Box sx={{ ...commentStyle.perCommentBox.leftColumn }}>
                  <Avatar>{comment?.creator[0]}</Avatar>
                </Box>
                <Box sx={{ ...commentStyle.perCommentBox.rightColumn }}>
                  <Box sx={{ ...commentStyle.creator }}>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {comment?.creator || 'Guest'}
                    </Typography>
                    <Typography variant="h8">
                      &nbsp; &nbsp;
                      {`${moment(comment?.date).fromNow()}`}
                    </Typography>
                  </Box>
                  <Typography sx={{ maxWidth: '100%' }}>
                    {comment?.body}
                  </Typography>
                </Box>
              </Box>
            ))}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

const guest = { name: 'Guest', email: 'Guest@gmail.com' };

const commentStyle = {
  title: {
    fontWeight: 'bold',
    alignItems: 'center',
    display: 'flex',
  },

  perCommentBox: {
    flexDirection: 'revert',
    display: 'flex',
    mt: '1rem',

    leftColumn: {
      flexShrink: '0',
      flexBasis: '50px',
    },

    rightColumn: {
      flexGrow: '1',
    },
  },

  creator: {
    flexWrap: 'nowrap',
    display: 'flex',
  },
};

export default Comment;
