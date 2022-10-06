import { useEffect, useState, createElement, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Typography,
  Grid,
  Container,
  Avatar,
  Divider,
  Button,
  Backdrop,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPost } from '../../actions/posts';
import { likePost } from '../../actions/posts';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import Comment from './CommentArea';
import Recommendations from './Recommendations';
import moment from 'moment';

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem('profile'));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const { posts, isLoading } = useSelector((state) => {
    return { ...state.posts };
  });
  const { comments } = posts;

  const [viewWholeImg, setViewWholeImg] = useState(false);

  const handleClose = () => {
    setViewWholeImg(false);
  };

  const handleToggle = () => {
    setViewWholeImg(!viewWholeImg);
  };

  const downloadImg = () => {
    let downloadLink = document.createElement('a');
    downloadLink.download = title;
    downloadLink.href = selectedFile;
    downloadLink.click();
  };

  useEffect(() => {
    dispatch(getPost(postId, navigate));
  }, [postId]);
  console.log(posts);

  if (!posts) return null;

  const {
    title,
    message,
    creator,
    selectedFile,
    tags,
    likes,
    name,
    _id,
    createdAt,
  } = posts;

  console.log(posts);

  const Likes = () => {
    const lengthOfLikes = likes?.length;
    if (lengthOfLikes > 0) {
      return likes.includes(user?.result?._id || user?.result?.googleId) ? (
        <>
          <ThumbUpAltIcon fontSize="medium" />
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
          <ThumbUpAltOutlinedIcon fontSize="medium" />
          &nbsp;
          {lengthOfLikes === 1
            ? `${lengthOfLikes} Like`
            : `${lengthOfLikes} Likes`}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="medium" />
        &nbsp; {lengthOfLikes} Like
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
      <Container sx={{}} maxWidth="xl">
        <Grid container rowSpacing={3} columnSpacing={5}>
          <Grid
            item
            xs={12}
            sx={{
              overflow: 'hidden',
            }}
          >
            <Avatar
              src={selectedFile}
              sx={{
                width: '100%',
                borderRadius: '1rem',

                height: '100%',
              }}
            ></Avatar>

            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={viewWholeImg}
              onClick={handleClose}
            >
              <Avatar
                src={selectedFile}
                sx={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '1rem',
                  // height: '800px',
                }}
              ></Avatar>
            </Backdrop>
            <Button onClick={handleToggle}>Show backdrop</Button>
          </Grid>

          <Grid item xs={8}>
            <Grid container spacing={2} sx={{}}>
              <Grid item xs={12}>
                {Array.isArray(tags) > 0 && (
                  <Typography>{tags.map((tag) => `#${tag} `)}</Typography>
                )}
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {title}
                </Typography>
                <Typography>Shared {moment(createdAt).fromNow()}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">{message}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(likePost(_id))}
                  disabled={!user?.result}
                  sx={{ fontWeight: 'bold' }}
                >
                  <Likes />
                </Button>
                <Button
                  onClick={() => {
                    downloadImg();
                  }}
                  sx={{ fontWeight: 'bold' }}
                >
                  <FileDownloadOutlinedIcon fontSize="medium" /> &nbsp; Download
                </Button>
                <Button>Paid</Button>
              </Grid>

              <Grid item>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mr: '1rem',
                    border: '0.5px solid #DDDEE2',
                    borderRadius: '5px',
                    p: '1rem',
                  }}
                >
                  <Box sx={{ mr: '1rem' }}>
                    <Avatar>{name && name[0]}</Avatar>
                  </Box>
                  <Divider orientation="vertical" flexItem />
                  <Box sx={{ ml: '1rem' }}>
                    <Typography
                      sx={{ fontWeight: 'bold', display: 'inline-block' }}
                    >
                      {name && name}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12} sx={{ mt: '1rem' }}>
                <Comment postId={postId} comments={comments} />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={4} sx={{}}>
            <Recommendations tags={tags} title={title} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostDetails;
