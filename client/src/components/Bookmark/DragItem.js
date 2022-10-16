import { useDrag } from 'react-dnd';
import { Typography, Box, Paper } from '@mui/material';
import { useState } from 'react';
import { bookmarkPost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ImgOrSkeleton from '../ImgOrSkeleton';
import moment from 'moment';

const DragItem = ({ post, idx }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isHover, setIsHover] = useState(false);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const handleRemoveBookmark = (whatItem) => dispatch(bookmarkPost(whatItem));

  const [{ isDragging }, drag] = useDrag(() => ({
    type: post._id,
    end: (item, monitor) => {
      const itemDropped = monitor.didDrop();
      const whatItem = monitor.getItemType();
      if (itemDropped) handleRemoveBookmark(whatItem);
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const overallLayout = {
    theMostOuterBox: {
      display: 'flex',
      gap: '10px',
      position: 'relative',
      p: '10px',
      '&:hover': {
        cursor: 'pointer',
      },
    },

    itemPaper: {
      minWidth: '500px',
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
          width: isHover === post._id ? '3px' : '0px',
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
          opacity: isHover === post._id ? '100%' : '0%',
          position: 'absolute',
          transition: 'ease-in-out 0.3s',
          zIndex: '2',
          fontSize: '20px',
          fontWeight: 'bold',
        },

        imgSkeleton: {
          width: '100%',
          height: '100%',
        },

        imgAvatar: {
          borderRadius: '0',
          width: '100%',
          height: '100%',
          aspectRatio: '3/2',
          filter: isHover === post._id ? 'brightness(10%)' : '',
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

  return (
    <Paper sx={{ ...overallLayout.itemPaper }}>
      <Box
        ref={drag}
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
        <Box sx={{ ...overallLayout.item.leftColumn }}>
          <ImgOrSkeleton
            isImgLoaded={isImgLoaded}
            setIsImgLoaded={setIsImgLoaded}
            selectedFile={post?.selectedFile}
            skeletonStyle={{ ...overallLayout.item.leftColumn.imgSkeleton }}
            imgStyle={{
              ...overallLayout.item.leftColumn.imgAvatar,
              display: isImgLoaded ? '' : 'none',
            }}
          />
        </Box>
        <Box sx={{ ...overallLayout.item.rightColumn }}>
          <Typography fontWeight="bold">{post?.title}</Typography>
          <Typography>{post?.name}</Typography>
          <Typography>{moment(post?.createdAt).fromNow()}</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default DragItem;