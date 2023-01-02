import {
  Box,
  Typography,
  Grid,
  Container,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPost, likePost, deletePost } from '../../actions/posts';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CLEANUP_FETCH_ONE } from '../../constants/actionTypes';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import Comment from './CommentArea';
import Recommendations from './Recommendations';
import Loading from '../Loading';
import ImgOrSkeleton from '../ImgOrSkeleton';
import moment from 'moment';

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  let {
    title,
    creator,
    message,
    selectedFile,
    tags,
    likes,
    name,
    _id,
    createdAt,
    comments,
    isLoading,
    isLoadingComments,
  } = useSelector((state) => {
    const { post, isLoading, isLoadingComments } = { ...state.posts };
    return { isLoading, ...post, isLoadingComments };
  });

  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const downloadImg = () => {
    let downloadLink = document.createElement('a');
    downloadLink.download = title;
    downloadLink.href = selectedFile;
    downloadLink.click();
  };

  useEffect(() => {
    dispatch(getPost(postId, navigate));
    return () => dispatch({ type: CLEANUP_FETCH_ONE });
  }, [postId]);

  const Likes = () => {
    const lengthOfLikes = likes?.length;
    if (lengthOfLikes > 0) {
      return likes.includes(user?.result?._id || user?.result?.googleId) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
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
          <ThumbUpAltOutlinedIcon fontSize="small" />
          &nbsp;
          {lengthOfLikes === 1
            ? `${lengthOfLikes} Like`
            : `${lengthOfLikes} Likes`}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp; {lengthOfLikes} Like
      </>
    );
  };

  if (isLoading) return <Loading type="big" />;

  if (!_id) return navigate('/posts', { replace: true });

  const PostDetailActions = () => {
    return (
      <>
        <Button
          color="primary"
          onClick={() => dispatch(likePost(_id))}
          disabled={!user?.result}
          sx={{ fontWeight: 'bold' }}
        >
          <Likes />
        </Button>

        <Button onClick={() => downloadImg()} sx={{ fontWeight: 'bold' }}>
          <FileDownloadOutlinedIcon fontSize="small" /> &nbsp; Download
        </Button>
        {(user?.result?.googleId === creator ||
          user?.result?._id === creator) && (
          <Button
            color="primary"
            sx={{ fontWeight: 'bold' }}
            onClick={() => dispatch(deletePost(_id, navigate))}
          >
            <DeleteIcon fontSize="small" /> &nbsp;Delete
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ minWidth: { xs: 360 } }}>
        <Grid container rowSpacing={3}>
          <Grid item xs={12}>
            <ImgOrSkeleton
              isImgLoaded={isImgLoaded}
              setIsImgLoaded={setIsImgLoaded}
              selectedFile={selectedFile}
              skeletonStyle={{ ...postDetailStyle.imgSkeleton }}
              imgStyle={{
                ...postDetailStyle.imgAvatar,
                display: isImgLoaded ? '' : 'none',
              }}
            />
          </Grid>

          <Grid item xs={12} sx={{ ...postDetailStyle.bottomPanel.outer }}>
            <Box sx={{ ...postDetailStyle.bottomPanel.content }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {Array.isArray(tags) > 0 && (
                    <Typography
                      variant="body2"
                      sx={{ wordBreak: 'break-word' }}
                    >
                      {tags.map((tag) => `#${tag} `)}
                    </Typography>
                  )}
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {title}
                  </Typography>
                  <Typography variant="body2">
                    Shared {moment(createdAt).fromNow()}
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography>{message}</Typography>
                </Grid>

                <Grid item xs={12}>
                  <PostDetailActions />
                </Grid>

                <Grid item>
                  <Box sx={{ ...postDetailStyle.creatorCard }}>
                    <Box sx={{ mr: '1rem' }}>
                      <Avatar>{name && name[0]}</Avatar>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box sx={{ ml: '1rem' }}>
                      <Typography
                        sx={{ fontWeight: 'bold', display: 'inline-block' }}
                      >
                        Created by {name && name}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} sx={{ mt: '1rem' }}>
                  <Comment
                    postId={postId}
                    comments={comments}
                    isLoadingComments={isLoadingComments}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ ...postDetailStyle.bottomPanel.recommend }}>
              <Recommendations tags={tags} title={title} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const postDetailStyle = {
  imgSkeleton: {
    borderRadius: '1rem',
    height: '100%',
    width: '100%',
    aspectRatio: '1/1',
  },

  imgAvatar: {
    width: '100%',
    borderRadius: '1rem',
    height: '100%',
  },

  bottomPanel: {
    outer: {
      display: 'flex',
      gap: { xs: '3rem', lg: '2rem' },
      flexWrap: { xs: 'wrap', lg: 'nowrap' },
    },

    content: {
      flexGrow: { xs: '1' },
    },

    recommend: {
      width: { width: '100%', sm: '420px' },
      flexGrow: { xs: '1', lg: '0' },
      flexShrink: { xs: '1', lg: '0' },
    },
  },

  creatorCard: {
    display: 'flex',
    alignItems: 'center',
    mr: '1rem',
    border: '0.5px solid #DDDEE2',
    borderRadius: '5px',
    p: '1rem',
  },
};

export default PostDetails;
