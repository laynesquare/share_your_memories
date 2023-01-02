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
      <Box
        sx={{
          ...overallLayout.item.leftColumn,
          '&::before': {
            ...overallLayout.item.leftColumn['&::before'],
            width: isHover === post._id ? '3px' : '0px',
          },
          '&::after': {
            ...overallLayout.item.leftColumn['&::after'],
            opacity: isHover === post._id ? '100%' : '0%',
          },
        }}
      >
        <Avatar
          src={post?.selectedFile}
          sx={{
            ...overallLayout.item.leftColumn.avatarImg,
            filter: isHover === post._id ? 'brightness(10%)' : '',
          }}
        ></Avatar>
      </Box>
      <Box sx={{ ...overallLayout.item.rightColumn }}>
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
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    gap: '10px',
    position: 'relative',
    p: '10px',
    borderRadius: '12px',
    '&:hover': { cursor: 'pointer' },
  },

  mostLeftColumn: {
    m: 'auto 0px',
    flexBasis: '30px',
    textAlign: 'center',
    flexShrink: '0',
  },

  item: {
    leftColumn: {
      flexBasis: '150px',
      flexShrink: '0',
      aspectRatio: '3/2',
      position: 'relative',

      '&::before': {
        left: '0',
        height: '100%',
        content: "''",
        bgcolor: 'primary.main',
        position: 'absolute',
        transition: 'ease-in-out 0.1s',
        zIndex: '2',
      },

      '&::after': {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        whiteSpace: 'nowrap',
        content: "'MORE'",
        position: 'absolute',
        transition: 'ease-in-out 0.3s',
        zIndex: '2',
        fontSize: '20px',
        fontWeight: 'bold',
      },

      avatarImg: {
        borderRadius: '0',
        width: '100%',
        height: '100%',
        aspectRatio: '3/2',
        zIndex: '0',
      },
    },

    rightColumn: {
      flexGrow: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  },
};

export default Item;
