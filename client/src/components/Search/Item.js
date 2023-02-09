import { Typography, Box, Avatar, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import decodeAndCutString from '../../utils/decodeAndCutString';
import moment from 'moment';

const Item = ({ post, idx }) => {
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);

  return (
    <Paper
      sx={{ ...overallLayout.theMostOuterBox }}
      onMouseEnter={() => setIsHover(post?._id)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => navigate(`/posts/detail/${post?._id}`)}
    >
      <Box sx={{ ...overallLayout.mostLeftColumn }}>
        <Typography variant="h5" fontWeight="bold">
          {idx + 1}
        </Typography>
      </Box>
      <Box sx={{ ...overallLayout.leftItem(isHover, post._id) }}>
        <Avatar
          src={post?.selectedFile}
          sx={{ ...overallLayout.avatarImg(isHover, post._id) }}
        ></Avatar>
      </Box>
      <Box sx={{ ...overallLayout.rightItem }}>
        <Typography fontWeight="bold">
          {decodeAndCutString(post?.title, 100)}
        </Typography>
        <Typography variant="body2">{post?.name}</Typography>
        <Typography variant="caption">
          {moment(post?.createdAt).fromNow()}
        </Typography>
      </Box>
    </Paper>
  );
};

const overallLayout = {
  theMostOuterBox: {
    flexDirection: { xs: 'column', sm: 'row' },
    borderRadius: '12px',
    position: 'relative',
    display: 'flex',
    gap: '10px',
    p: '10px',
    '&:hover': { cursor: 'pointer' },
  },

  mostLeftColumn: {
    flexShrink: '0',
    textAlign: 'center',
    flexBasis: '30px',
    m: 'auto 0px',
  },

  leftItem: (isHover, postId) => ({
    aspectRatio: '3/2',
    flexShrink: '0',
    flexBasis: '150px',
    position: 'relative',

    '&::before': {
      transition: 'ease-in-out 0.1s',
      position: 'absolute',
      content: "''",
      bgcolor: 'primary.main',
      height: '100%',
      zIndex: '2',
      width: isHover === postId ? '3px' : '0px',
      left: '0',
    },

    '&::after': {
      transition: 'ease-in-out 0.3s',
      whiteSpace: 'nowrap',
      fontWeight: 'bold',
      transform: 'translate(-50%,-50%)',
      position: 'absolute',
      fontSize: '20px',
      content: "'MORE'",
      opacity: isHover === postId ? '100%' : '0%',
      zIndex: '2',
      left: '50%',
      top: '50%',
    },
  }),

  rightItem: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flexGrow: '1',
    display: 'flex',
  },

  avatarImg: (isHover, postId) => ({
    borderRadius: '0',
    aspectRatio: '3/2',
    height: '100%',
    zIndex: '0',
    filter: isHover === postId ? 'brightness(10%)' : '',
    width: '100%',
  }),
};

export default Item;
