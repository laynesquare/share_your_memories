import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import Post from './Post/Post';
import { useSelector } from 'react-redux';

const Posts = ({ setCurrentId }) => {
  const { posts, isLoding } = useSelector((state) => {
    return state.posts;
  });

  if (!posts.length && !isLoding) return <h1>No Posts</h1>;

  return isLoding ? (
    <CircularProgress />
  ) : (
    <Grid className="container" container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
