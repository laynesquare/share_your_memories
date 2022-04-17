import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const Posts = ({ setCurrentId, page }) => {
  const navigate = useNavigate();
  const { posts, isLoading } = useSelector((state) => {
    return state.posts;
  });

  if (!posts.length && !isLoading) {
    if (Number(page) !== 1) return navigate(`/posts?page=${Number(page) - 1}`);
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Typography variant="h3">
          No posts... yet. Log in and create something!
        </Typography>
      </Box>
    );
  }

  return isLoading ? (
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
  ) : (
    <Grid container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
