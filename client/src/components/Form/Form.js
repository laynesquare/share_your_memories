import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grow,
  Divider,
} from '@mui/material';
import FileBase from 'react-file-base64';
import { createPost, updatePost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import LoginIcon from './LoginIcon.js';
import { Box } from '@mui/system';

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));

  const post = useSelector((state) => {
    return currentId
      ? state.posts.posts.find((p) => p._id === currentId)
      : null;
  });

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(
        updatePost(currentId, { ...postData, name: user?.result?.name })
      );
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  if (!user?.result?._id && !user?.result?.googleId) {
    return (
      <Grow in>
        <Paper sx={{ p: '1rem', borderRadius: '1rem' }}>
          <Box
            sx={{
              justifyContent: 'center',
              width: '100%',
              p: '20%',
            }}
          >
            <LoginIcon />
          </Box>
          <Typography
            variant="h4"
            color="primary"
            sx={{
              textAlign: 'center',
              letterSpacing: '0.1rem',
              fontWeight: 'bold',
              mb: '1rem',
            }}
          >
            START BY LOGIN
          </Typography>
          <Divider sx={{ mb: '1rem' }} />
          <Typography sx={{ textAlign: 'justify' }}>
            Log in to share your memories with the world and give a thumb up to
            your favorite memories.
          </Typography>
        </Paper>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Paper sx={{ p: '1.5rem', borderRadius: '1rem' }}>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
            {currentId ? 'Edit' : 'Create'} a memory
          </Typography>
          <TextField
            required
            name="title"
            variant="standard"
            label="Title"
            fullWidth
            value={postData.title}
            sx={{ mb: '1rem', border: 'none' }}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          ></TextField>
          <TextField
            required
            name="message"
            variant="standard"
            label="Message"
            fullWidth
            value={postData.message}
            sx={{ mb: '1rem' }}
            onChange={(e) => {
              setPostData({ ...postData, message: e.target.value });
            }}
          ></TextField>
          <TextField
            required
            name="tags"
            variant="standard"
            label="Tags"
            fullWidth
            value={postData.tags}
            helperText="Note: Separate tags with commas without spaces. E.g.: tag1,tag2,tag3"
            sx={{ mb: '2rem' }}
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(',') });
            }}
          ></TextField>
          <div>
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setPostData({ ...postData, selectedFile: base64 });
              }}
            ></FileBase>
          </div>
          <Typography sx={{ fontSize: '0.5rem', mb: '1rem' }}>
            Note: The system will automatically select an img for you if not
            specified.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            sx={{ mb: '1rem' }}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </Grow>
  );
};

export default Form;
