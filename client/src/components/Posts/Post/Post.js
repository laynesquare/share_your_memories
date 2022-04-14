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
import { useNavigate } from 'react-router-dom'; //? testing should be handled

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); //? testing should be handled
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
    <Grow in={true}>
      <Card className="card">
        <CardMedia
          className="overlay"
          // image={post.selectedFile ? post.selectedFile : ``}
          // title={post.title}
          component="img"
          // sx={{ maxHeight: '200px' }}
        />

        {isImgLoaded ? null : (
          <>
            {/* If the img is not loaded, show the skeleton */}
            <Skeleton variant="rectangular" height={200} />
          </>
        )}

        <Avatar
          alt="memory_img"
          src={'https://source.unsplash.com/random'}
          onLoad={() => {
            setisImgLoaded((pre) => !pre);
          }}
          sx={{
            width: '100%',
            height: '200px',
            borderRadius: '0%',
            // If the img is loaded, then remove the skeleton
            display: isImgLoaded ? '' : 'none',
          }}
        ></Avatar>

        <div className="overlay">
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className="overlay2">
          {user?.result?._id === post.creator && (
            <Button
              style={{ color: 'white' }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          )}
        </div>
        <div className="details">
          <Typography variant="body2" color="textSecondary" component="h2">
            {Array.isArray(post.tags) && post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className="classes.title"
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {post.message}
          </Typography>
        </CardContent>
        <CardActions className="cardActions">
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
  );
};

export default Post;
