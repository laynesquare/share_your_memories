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

  creatorCard: {
    display: 'flex',
    alignItems: 'center',
    mr: '1rem',
    border: '0.5px solid #DDDEE2',
    borderRadius: '5px',
    p: '1rem',
  },
};

const PostDetails = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  let {
    title,
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

  if (!_id) return null;

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
    return <Loading type="big" />;
  }

  const PostDetailActions = () => {
    return (
      <>
        <Button
          size="small"
          color="primary"
          onClick={() => dispatch(likePost(_id))}
          disabled={!user?.result}
          sx={{ fontWeight: 'bold' }}
        >
          <Likes />
        </Button>

        <Button onClick={() => downloadImg()} sx={{ fontWeight: 'bold' }}>
          <FileDownloadOutlinedIcon fontSize="medium" /> &nbsp; Download
        </Button>

        <Button
          size="small"
          color="primary"
          sx={{ fontWeight: 'bold' }}
          onClick={() => dispatch(deletePost(_id, navigate))}
        >
          <DeleteIcon fontSize="medium" /> &nbsp;Delete
        </Button>
      </>
    );
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container rowSpacing={3} columnSpacing={5}>
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

          <Grid item xs={8}>
            <Grid container spacing={2}>
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
          </Grid>

          <Grid item xs={4}>
            <Recommendations tags={tags} title={title} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default PostDetails;
