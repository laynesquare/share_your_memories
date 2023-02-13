import {
  Typography,
  TextField,
  Divider,
  Button,
  Paper,
  Grow,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginIcon from './LoginIcon.js';
import ImgUpload from './ImgUpload';

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [postData, setPostData] = useState({ ...initialPostData });
  const user = JSON.parse(localStorage.getItem('profile'));
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );

  const clear = () => {
    setCurrentId(null);
    setPostData({ ...initialPostData });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData }));
      clear();
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, navigate));
    }
  };

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  if (!user?.result?._id && !user?.result?.googleId) return <StartByLogin />;

  return (
    <Grow in>
      <Paper sx={{ ...formStyle.mostOuterPaper }}>
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
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          ></TextField>
          <TextField
            required
            name="message"
            variant="standard"
            label="Message"
            fullWidth
            value={postData.message}
            sx={{ mb: '1rem' }}
            onChange={(e) =>
              setPostData({ ...postData, message: e.target.value })
            }
          ></TextField>
          <TextField
            required
            name="tags"
            variant="standard"
            label="Tags"
            fullWidth
            value={postData.tags}
            helperText="Note: Separate tags with commas without spaces. E.g.: tag1,tag2,tag3"
            sx={{ mb: '0.8rem' }}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(',') })
            }
          ></TextField>
          <ImgUpload setPostData={setPostData} postData={postData} />
          <Typography
            variant="caption"
            sx={{ mb: '1rem', mt: '0.2rem', display: 'block' }}
          >
            Note:
            <br />
            <span>
              {' '}
              1. If not specified, the system will automatically select an img
              for you via Unsplash API{' '}
              {`(subject to change upon page refreshed)`}.
            </span>
            <br />
            <span>2. The max. size is 10MB.</span>
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

const StartByLogin = () => {
  return (
    <>
      <Grow in>
        <Paper sx={{ ...formStyle.mostOuterPaper }}>
          <Box sx={{ p: '20%' }}>
            <LoginIcon />
          </Box>
          <Typography
            variant="h4"
            color="primary"
            sx={{ ...formStyle.logginPrompt }}
          >
            START BY LOGIN
          </Typography>
          <Divider sx={{ mb: '1rem' }} />
          <Typography variant="body1" sx={{ textAlign: 'justify' }}>
            Log in to share your memories with the world and give a thumbs up to
            your favorite memories.
          </Typography>
        </Paper>
      </Grow>
    </>
  );
};

const initialPostData = {
  title: '',
  message: '',
  tags: '',
  selectedFile: '',
};

const formStyle = {
  mostOuterPaper: {
    borderRadius: '1rem',
    overflowY: 'scroll',
    overflowX: 'hidden',
    maxHeight: '90vh',
    p: '1.5rem',
  },

  logginPrompt: {
    letterSpacing: '0.1rem',
    fontWeight: 'bold',
    textAlign: 'center',
    mb: '1rem',
  },
};

export default Form;
