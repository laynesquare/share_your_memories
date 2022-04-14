import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Typography, Paper, Grow } from '@mui/material';
import FileBase from 'react-file-base64';
import { createPost, updatePost, getPosts } from '../../actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';

const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
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
  // const classes = useStyles();

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
        <Paper className="paper">
          Sign in to share your memories with the world and give a thumb up to
          your favorite memories.
        </Paper>
      </Grow>
    );
  }

  return (
    <Grow in>
      <Paper className="paper">
        <form
          autoComplete="off"
          noValidate
          className="root form"
          onSubmit={handleSubmit}
        >
          <Typography varian="h6">
            {currentId ? 'Edit' : 'Create'} a memory
          </Typography>
          <TextField
            required
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            value={postData.title}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          ></TextField>
          <TextField
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            value={postData.message}
            onChange={(e) => {
              setPostData({ ...postData, message: e.target.value });
            }}
          ></TextField>
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(',') });
            }}
          ></TextField>
          <div className="fileInput">
            <FileBase
              type="file"
              multiple={false}
              onDone={({ base64 }) => {
                setPostData({ ...postData, selectedFile: base64 });
              }}
            ></FileBase>
          </div>
          <Typography sx={{ fontSize: '0.5rem' }}>
            Note: <br />
            The system will automatically select an img for you if not
            specified.
          </Typography>
          <Button
            className="buttonSubmit"
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
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
