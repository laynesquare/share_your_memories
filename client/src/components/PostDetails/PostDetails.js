import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Container,
  Avatar,
  Paper,
  Divider,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import { likePost } from '../../actions/posts';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ForumIcon from '@mui/icons-material/Forum';
import Comment from './CommentArea';

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { posts, isLoading } = useSelector((state) => {
    return { ...state.posts };
  });
  const { comments } = posts;

  useEffect(() => {
    dispatch(getPost(postId, navigate));
  }, [postId]);
  console.log(posts);

  if (!posts) return null;

  const { title, message, creator, selectedFile, tags, likes, name, _id } =
    posts;

  console.log(posts);

  const Likes = () => {
    const lengthOfLikes = likes?.length;
    if (lengthOfLikes > 0) {
      return likes.includes(user?.result?._id || user?.result?.googleId) ? (
        <>
          <ThumbUpAltIcon fontSize="large" />
          &nbsp;
          {lengthOfLikes > 2
            ? `You, and ${lengthOfLikes - 1} others`
            : //only ONE or TWO people liked the post
              //ONE: the user (only showing you)
              //TWO: the user and one other person (showing you and one other person)
              `You${lengthOfLikes - 1 === 0 ? '' : ', and 1 other'}`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlinedIcon fontSize="large" />
          &nbsp;
          {lengthOfLikes === 1
            ? `${lengthOfLikes} Like`
            : `${lengthOfLikes} Likes`}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="large" /> &nbsp;
        {lengthOfLikes} Like
      </>
    );
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CircularProgress size="2rem" />
      </Box>
    );
  }

  return (
    <>
      <Container sx={{ background: 'green', overflow: 'hidden' }} maxWidth="lg">
        <Grid container spacing={2}>
          <Grid
            item
            sm={12}
            sx={{
              background: 'red',
              overflow: 'hidden',
            }}
          >
            <Avatar
              src={selectedFile}
              sx={{
                width: '100%',
                borderRadius: '0',
                height: '800px',
              }}
            ></Avatar>
          </Grid>

          <Grid item xs={12}>
            {Array.isArray(tags) > 0 && (
              <Typography>{tags.map((tag) => `#${tag} `)}</Typography>
            )}
            <Typography variant="h4" sx={{ mb: '1rem', fontWeight: 'bold' }}>
              {title}
            </Typography>

            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: '1rem' }}>
              {message}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(likePost(_id))}
              disabled={!user?.result}
            >
              <Likes />
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(likePost(_id))}
              disabled={!user?.result}
            >
              <Likes />
            </Button>
          </Grid>

          <Grid item xs={12} sx={{ mb: '1rem' }}>
            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold',
              }}
            >
              <ForumIcon fontSize="large" /> &nbsp; Comments
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Comment postId={postId} comments={comments} />
        </Grid>
      </Container>

      <Typography variant="h6" sx={{ display: 'block', mb: '0' }}>
        {name}
      </Typography>
    </>
  );
};

export default PostDetails;
