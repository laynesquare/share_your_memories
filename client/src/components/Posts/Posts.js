import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import Post from './Post/Post';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Posts = ({ setCurrentId, page }) => {
  const navigate = useNavigate();
  const { posts, isLoading } = useSelector((state) => {
    return state.posts;
  });

  if (!posts.length && !isLoading && Number(page) !== 1) {
    navigate(`/posts?page=${Number(page) - 1}`);
  }

  if (!posts.length && !isLoading) return <h1>No Posts</h1>;

  return isLoading ? (
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
