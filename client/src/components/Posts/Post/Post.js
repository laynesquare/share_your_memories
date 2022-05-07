import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grow,
  Skeleton,
  Avatar,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isImgLoaded, setisImgLoaded] = useState(false);
  const user = JSON.parse(localStorage.getItem('profile'));

  // Check if the post is liked by the user

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
    <div>
      <Grow in={true}>
        <Card sx={{ position: 'relative' }}>
          <CardMedia component="img" />
          {isImgLoaded ? null : (
            <>
              {/* If the img is not loaded, show the skeleton */}
              <Skeleton variant="rectangular" height={200} />
            </>
          )}

          <Avatar
            alt="memory_img"
            src={post?.selectedFile || 'https://source.unsplash.com/random'}
            onLoad={() => {
              setisImgLoaded((pre) => !pre);
            }}
            sx={{
              width: '100%',
              height: '200px',
              borderRadius: '0%',
              pointerEvents: 'none',
              filter: 'brightness(0.5)',
              // If the img is loaded, then remove the skeleton
              display: isImgLoaded ? '' : 'none',
            }}
          ></Avatar>

          <div>
            <Typography
              variant="h6"
              sx={{ position: 'absolute', top: '0.5rem', left: '1rem' }}
            >
              {post.name}
            </Typography>
            <Typography
              sx={{
                position: 'absolute',
                top: '2.5rem',
                left: '1rem',
                fontSize: '0.8rem',
              }}
            >
              {moment(post.createdAt).fromNow()}
            </Typography>
          </div>
          <div>
            {user?.result?._id === post.creator && (
              <Button
                color="primary"
                sx={{
                  position: 'absolute',
                  top: '0.7rem',
                  right: '0rem',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'transparent',
                    transform: 'translate(0, -0.25em)',
                  },
                }}
                onClick={() => {
                  setCurrentId(post._id);
                }}
              >
                <MoreHorizIcon fontSize="medium" />
              </Button>
            )}
          </div>
          <CardContent>
            <Typography color="textSecondary" sx={{ fontSize: '0.8rem' }}>
              {Array.isArray(post.tags) && post.tags.map((tag) => `#${tag} `)}
            </Typography>

            <Typography gutterBottom variant="h5">
              {post.title}
            </Typography>

            <Typography color="textSecondary">{post.message}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => dispatch(likePost(post._id))}
              disabled={!user?.result}
            >
              <Likes />
            </Button>
            {(user?.result?.googleId === post.creator ||
              user?.result?._id === post.creator) && (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  dispatch(deletePost(post._id, navigate));
                }}
              >
                <DeleteIcon fontSize="small" /> Delete
              </Button>
            )}
          </CardActions>
        </Card>
      </Grow>
    </div>
  );
};

export default Post;
