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
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const goToPostDetails = (postId) => navigate(`/posts/detail/${post._id}`);

  const Likes = () => {
    const lengthOfLikes = post?.likes?.length;
    if (lengthOfLikes > 0) {
      return post.likes.includes(
        user?.result?._id || user?.result?.googleId
      ) ? (
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
        <ThumbUpAltOutlinedIcon fontSize="small" /> &nbsp;
        {lengthOfLikes} Like
      </>
    );
  };

  return (
    <Grow in={true}>
      <Card sx={{ ...postStyle.mostOuterBox }}>
        {user?.result?._id === post.creator && (
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
          onClick={() => goToPostDetails(post._id)}
          sx={{ ...postStyle.postBaseBtn }}
        >
          <ImgOrSkeleton
            isImgLoaded={isImgLoaded}
            setIsImgLoaded={setIsImgLoaded}
            selectedFile={post?.selectedFile}
            skeletonStyle={{ ...postStyle.imgSkeleton }}
            imgStyle={{
              ...postStyle.imgAvatar,
              display: isImgLoaded ? '' : 'none',
            }}
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
              {Array.isArray(post.tags) && post.tags.map((tag) => `#${tag} `)}
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
              title={
                post.likes.includes(user?.result?._id || user?.result?.googleId)
                  ? 'Unlike it'
                  : 'Like it'
              }
            >
              <span>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(likePost(post._id))}
                  disabled={!user?.result}
                >
                  <Likes />
                </Button>
              </span>
            </Tooltip>

            {(user?.result?.googleId === post.creator ||
              user?.result?._id === post.creator) && (
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

            {user?.result && (
              <Tooltip
                title={
                  post?.bookmark?.find(
                    (bookmarkUser) =>
                      bookmarkUser ===
                      (user?.result?._id || user?.result?.googleId)
                  )
                    ? 'Remove Bookmark'
                    : 'Bookmark'
                }
              >
                <Button
                  size="small"
                  color="primary"
                  onClick={() => dispatch(bookmarkPost(post._id))}
                >
                  {post?.bookmark?.find(
                    (bookmarkUser) =>
                      bookmarkUser ===
                      (user?.result?._id || user?.result?.googleId)
                  ) ? (
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

const postStyle = {
  mostOuterBox: {
    position: 'relative',
  },

  postBaseBtn: {
    display: 'block',
    width: '100%',
    '&:hover': {
      backgroundColor: 'rgba(4, 0, 0, 0.08)',
    },
  },

  imgAvatar: {
    width: '100%',
    height: '200px',
    borderRadius: '0%',
    pointerEvents: 'none',
    filter: 'brightness(0.5)',
  },

  imgSkeleton: {
    height: '200px',
  },

  name: {
    position: 'absolute',
    top: '0.5rem',
    left: '1rem',
    whiteSpace: 'nowrap',
  },

  createdAt: {
    position: 'absolute',
    top: '2.5rem',
    left: '1rem',
    fontSize: '0.8rem',
  },

  moreBtn: {
    position: 'absolute',
    top: '0.7rem',
    right: '0rem',
    transition: 'all 0.3s',
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
    display: 'flex',
    flexWrap: 'nowrap',
    p: '0.6rem',
    position: 'relative',

    shadowBox: {
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '80%',
        background:
          'linear-gradient(0deg, rgba(44,45,49,1) 0%, rgba(46,48,48,0) 100%)',
        left: '0',
        transform: 'translateY(-100%)',
      },
    },
  },
};

export default Post;
