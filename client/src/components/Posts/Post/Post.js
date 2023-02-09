import {
  CardContent,
  Typography,
  ButtonBase,
  Tooltip,
  Button,
  Card,
  Grow,
  Box,
} from '@mui/material';
import { deletePost, likePost, bookmarkPost } from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ImgOrSkeleton from '../../ImgOrSkeleton';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'));
  const currentUser = user?.result?._id || user?.result?.googleId;
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const goToPostDetails = () => navigate(`/posts/detail/${post._id}`);

  return (
    <Grow in>
      <Card sx={{ ...postStyle.mostOuterBox }}>
        {currentUser === post.creator && (
          <Tooltip title="Edit the post">
            <Button
              color="primary"
              sx={{ ...postStyle.moreBtn }}
              onClick={() => setCurrentId(post._id)}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </Tooltip>
        )}

        <ButtonBase
          onClick={() => goToPostDetails()}
          sx={{ ...postStyle.postBaseBtn }}
        >
          <ImgOrSkeleton
            isImgLoaded={isImgLoaded}
            setIsImgLoaded={setIsImgLoaded}
            selectedFile={post?.selectedFile}
            skeletonStyle={{ ...postStyle.imgSkeleton }}
            imgStyle={{ ...postStyle.imgAvatar(isImgLoaded) }}
          />
          <div>
            <Typography variant="h6" sx={{ ...postStyle.name }}>
              {post.name}
            </Typography>
            <Typography sx={{ ...postStyle.createdAt }}>
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>

          <CardContent sx={{ ...postStyle.cardContent }}>
            <Typography
              color="textSecondary"
              variant="caption"
              sx={{ textAlign: 'left', display: 'block' }}
            >
              {post?.tags?.length && post.tags.map((tag) => `#${tag} `)}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              sx={{ textAlign: 'left', fontWeight: 'bold' }}
            >
              {post.title}
            </Typography>
            <Typography color="textSecondary" sx={{ textAlign: 'left' }}>
              {post.message}
            </Typography>
          </CardContent>
        </ButtonBase>

        <Box sx={{ ...postStyle.cardAction }}>
          <Box sx={{ ...postStyle.cardAction.shadowBox }}>
            <Tooltip
              title={post.likes.includes(currentUser) ? 'Unlike it' : 'Like it'}
            >
              <Button
                size="small"
                color="primary"
                onClick={() => dispatch(likePost(post._id))}
                disabled={!currentUser}
              >
                <Likes likes={post?.likes} />
              </Button>
            </Tooltip>

            {currentUser === post.creator && (
              <Tooltip title="Delete">
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(deletePost(post._id, navigate))}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </Tooltip>
            )}

            {currentUser && (
              <Tooltip
                title={
                  post?.bookmark?.includes(currentUser)
                    ? 'Remove Bookmark'
                    : 'Bookmark'
                }
              >
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(bookmarkPost(post._id))}
                >
                  {post?.bookmark?.includes(currentUser) ? (
                    <BookmarkIcon fontSize="small" />
                  ) : (
                    <TurnedInNotIcon fontSize="small" />
                  )}
                </Button>
              </Tooltip>
            )}
          </Box>
        </Box>
      </Card>
    </Grow>
  );
};

const Likes = ({ likes }) => {
  const likeCount = likes?.length;
  const user = JSON.parse(localStorage.getItem('profile'));
  const currentUser = user?.result?._id || user?.result?.googleId;

  if (!likeCount)
    return (
      <>
        <ThumbUpAltOutlinedIcon fontSize="small" />
        &nbsp; 0 Like
      </>
    );

  if (likes.includes(currentUser))
    return (
      <>
        <ThumbUpAltIcon fontSize="small" />
        &nbsp;
        {likeCount > 2
          ? `You & ${likeCount - 1} others`
          : `You${likeCount - 1 === 0 ? '' : ' & 1 other'}`}
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

const postStyle = {
  mostOuterBox: {
    position: 'relative',
  },

  postBaseBtn: {
    display: 'block',
    width: '100%',
    '&:hover': { backgroundColor: 'rgba(4, 0, 0, 0.08)' },
  },

  imgAvatar(isImgLoaded) {
    return {
      pointerEvents: 'none',
      borderRadius: '0%',
      display: isImgLoaded ? '' : 'none',
      filter: 'brightness(0.5)',
      height: '200px',
      width: '100%',
    };
  },

  imgSkeleton: {
    height: '200px',
  },

  name: {
    whiteSpace: 'nowrap',
    position: 'absolute',
    top: '0.5rem',
    left: '1rem',
  },

  createdAt: {
    position: 'absolute',
    fontSize: '0.8rem',
    left: '1rem',
    top: '2.5rem',
  },

  moreBtn: {
    transition: 'all 0.3s',
    position: 'absolute',
    top: '0.7rem',
    right: '0rem',
    zIndex: '2',
    '&:hover': {
      backgroundColor: 'transparent',
      transform: 'translate(0, -0.25em)',
    },
  },

  cardContent: {
    maxHeight: '300px',
    overflow: 'hidden',
  },

  cardAction: {
    position: 'relative',
    p: '0.6rem',

    shadowBox: {
      flexWrap: 'noWrap',
      display: 'flex',
      '&:before': {
        transform: 'translateY(-100%)',
        position: 'absolute',
        content: "''",
        height: '80%',
        width: '100%',
        left: '0',
        background:
          'linear-gradient(0deg, rgba(44,45,49,1) 0%, rgba(46,48,48,0) 100%)',
      },
    },
  },
};

export default Post;
