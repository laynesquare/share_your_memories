import { useDrag } from 'react-dnd';
import {
  Typography,
  Box,
  Paper,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useState } from 'react';
import { bookmarkPost } from '../../actions/posts';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import decodeAndCutString from '../../utils/decodeAndCutString';
import ImgOrSkeleton from '../ImgOrSkeleton';
import moment from 'moment';

const DragItem = ({ post, idx }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const mediumSizedWindow = useMediaQuery(theme.breakpoints.down('lg'));
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
      flexDirection: { xs: 'column', sm: 'row' },
      gap: '10px',
      position: 'relative',
      p: '10px',
      borderRadius: '12px',
      '&:hover': { cursor: 'pointer' },
    },

    mostLeftColumn: {
      position: 'relative',
      m: 'auto 0px',
      flexBasis: '30px',
      textAlign: 'center',
      flexShrink: '0',
      index: {
        '&::before': { xs: { content: "'- '" }, sm: { content: "''" } },
        '&::after': { xs: { content: "' -'" }, sm: { content: "''" } },
      },
    },

    item: {
      leftColumn: {
        flexBasis: '130px',
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
          fontSize: '1rem',
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
    <Paper
      ref={drag}
      sx={{ ...overallLayout.theMostOuterBox }}
      onMouseEnter={() => setIsHover(post?._id)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => navigate(`/posts/detail/${post?._id}`)}
    >
      <Box sx={{ ...overallLayout.mostLeftColumn }}>
        <Typography
          fontWeight="bold"
          variant="h5"
          sx={{ ...overallLayout.mostLeftColumn.index }}
        >
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
        <Typography fontWeight="bold">
          {decodeAndCutString(post?.title, 100)}
        </Typography>
        <Typography variant="body2">{post?.name}</Typography>
        <Typography variant="caption">
          {moment(post?.createdAt).fromNow()}
        </Typography>
      </Box>

      {mediumSizedWindow && (
        <>
          <Box
            sx={{
              display: 'flex',
              position: { xs: 'absolute', sm: 'relative' },
              top: '0',
              right: '0',
              m: { xs: '8px', sm: '0' },
            }}
          >
            <IconButton
              color="primary"
              onClick={(e) => {
                e.stopPropagation();
              }}
              sx={{ m: 'auto' }}
            >
              <BookmarkIcon />
            </IconButton>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default DragItem;
