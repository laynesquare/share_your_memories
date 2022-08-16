import React, { useEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import Comment from './CommentArea';

const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { post, isLoading } = useSelector((state) => {
    return { ...state.posts };
  });

  useEffect(() => {
    dispatch(getPost(postId, navigate));
  }, [postId]);

  if (!post) return null;

  const { title, message, creator, selectedFile, tags, likes, name, _id } =
    post;

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
      <Typography variant="h3">Basic Info</Typography>
      <div>{title}</div>
      <div>{message}</div>
      <div>{creator}</div>
      <div>{selectedFile}</div>
      <div>{tags}</div>
      <div>{likes}</div>
      <div>{name}</div>
      <div>{_id}</div>
      <Typography variant="h3">Comment Section</Typography>
    </>
  );
};

export default PostDetails;
