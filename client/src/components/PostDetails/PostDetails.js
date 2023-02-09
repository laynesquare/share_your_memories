import {
  Typography,
  Container,
  Divider,
  Button,
  Avatar,
  Grid,
  Box,
} from '@mui/material';
import {
  bookmarkPost,
  deletePost,
  likePost,
  getPost,
} from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { CLEANUP_FETCH_ONE } from '../../constants/actionTypes';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import Recommendations from './Recommendations';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ImgOrSkeleton from '../ImgOrSkeleton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import Comment from './CommentArea';
import Loading from '../Loading';
import moment from 'moment';

const PostDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const { postId } = useParams();

  const {
    isLoadingComments,
    selectedFile,
    isLoading,
    createdAt,
    comments,
    message,
    title,
    tags,
    name,
  } = useSelector((state) => {
    const { post, isLoading, isLoadingComments } = { ...state.posts };
    return { isLoading, ...post, isLoadingComments };
  });

  useEffect(() => {
    dispatch(getPost(postId, navigate));
    return () => dispatch({ type: CLEANUP_FETCH_ONE });
  }, [postId]);

  if (isLoading) return <Loading type="big" />;

  return (
    <Container maxWidth="xl" sx={{ minWidth: { xs: 360 } }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <ImgOrSkeleton
            isImgLoaded={isImgLoaded}
            setIsImgLoaded={setIsImgLoaded}
            selectedFile={selectedFile}
            skeletonStyle={{ ...style.imgSkeleton }}
            imgStyle={{ ...style.imgAvatar(isImgLoaded) }}
          />
        </Grid>

        <Grid item xs={12} sx={{ ...style.bottomPanel.outer }}>
          <Box sx={{ ...style.bottomPanel.content }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {tags?.length && (
                  <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
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
                <Box sx={{ ...style.creatorCard }}>
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

          <Box sx={{ ...style.bottomPanel.recommend }}>
            <Recommendations tags={tags} title={title} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

const PostDetailActions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const currentUser = user?.result?._id || user?.result?.googleId;
  const { selectedFile, creator, bookmark, title, _id } = useSelector(
    (state) => ({ ...state.posts.post })
  );

  return (
    <>
      <Button
        color="primary"
        disabled={!user?.result}
        onClick={() => dispatch(likePost(_id))}
        sx={{ fontWeight: 'bold' }}
      >
        <Likes />
      </Button>

      <Button
        onClick={() => downloadImg(title, selectedFile)}
        sx={{ fontWeight: 'bold' }}
      >
        <FileDownloadOutlinedIcon fontSize="small" /> &nbsp; Download
      </Button>

      {currentUser === creator && (
        <Button
          color="primary"
          sx={{ fontWeight: 'bold' }}
          onClick={() => dispatch(deletePost(_id, navigate))}
        >
          <DeleteIcon fontSize="small" /> &nbsp;Delete
        </Button>
      )}

      {currentUser && (
        <Button
          size="small"
          color="primary"
          sx={{ fontWeight: 'bold' }}
          onClick={() => dispatch(bookmarkPost(_id))}
        >
          {bookmark?.includes(currentUser) ? (
            <>
              <BookmarkIcon fontSize="small" />
              &nbsp;Unbookmark
            </>
          ) : (
            <>
              <TurnedInNotIcon fontSize="small" />
              &nbsp;Bookmark
            </>
          )}
        </Button>
      )}
    </>
  );
};

const Likes = () => {
  const { likes } = useSelector((state) => ({ ...state.posts.post }));
  const user = JSON.parse(localStorage.getItem('profile'));
  const likeCount = likes?.length;

  if (!likeCount)
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp; 0 Like
      </>
    );

  if (likes.includes(user?.result?._id || user?.result?.googleId))
    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;
        {likeCount > 2
          ? `You, and ${likeCount - 1} others`
          : `You${likeCount - 1 === 0 ? '' : ', and 1 other'}`}
      </>
    );

  return (
    <>
      <ThumbUpAltOutlinedIcon fontSize="small" />
      &nbsp;
      {likeCount === 1 ? `${likeCount} Like` : `${likeCount} Likes`}
    </>
  );
};

const downloadImg = (title, selectedFile) => {
  if (!selectedFile) return window.open('https://source.unsplash.com/random');
  const downloadLink = document.createElement('a');
  downloadLink.download = title;
  downloadLink.href = selectedFile;
  downloadLink.click();
};

const style = {
  imgSkeleton: {
    borderRadius: '1rem',
    aspectRatio: '1/1',
    height: '100%',
    width: '100%',
  },

  imgAvatar(isImgLoaded) {
    return {
      borderRadius: '1rem',
      display: isImgLoaded ? '' : 'none',
      height: '100%',
      width: '100%',
    };
  },

  bottomPanel: {
    outer: {
      flexWrap: { xs: 'wrap', lg: 'nowrap' },
      display: 'flex',
      gap: { xs: '3rem', lg: '2rem' },
    },

    content: {
      flexGrow: { xs: '1' },
    },

    recommend: {
      flexShrink: { xs: '1', lg: '0' },
      flexGrow: { xs: '1', lg: '0' },
      width: { width: '100%', sm: '420px' },
    },
  },

  creatorCard: {
    borderRadius: '5px',
    alignItems: 'center',
    display: 'flex',
    border: '0.5px solid #DDDEE2',
    mr: '1rem',
    p: '1rem',
  },
};

export default PostDetails;
