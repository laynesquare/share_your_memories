import {
  useMediaQuery,
  Typography,
  IconButton,
  useTheme,
  Tooltip,
  Paper,
  Box,
} from '@mui/material';
import { bookmarkPost } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDrag } from 'react-dnd';
import { useState } from 'react';
import decodeAndCutString from '../../utils/decodeAndCutString';
import ImgOrSkeleton from '../ImgOrSkeleton';
import BookmarkIcon from '@mui/icons-material/Bookmark';
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
        <ImgOrSkeleton
          isImgLoaded={isImgLoaded}
          setIsImgLoaded={setIsImgLoaded}
          selectedFile={post?.selectedFile}
          skeletonStyle={{ ...overallLayout.item.leftColumn.imgSkeleton }}
          imgStyle={{
            ...overallLayout.item.leftColumn.imgAvatar,
            display: isImgLoaded ? '' : 'none',
            filter: isHover === post._id ? 'brightness(10%)' : '',
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
          <Box sx={{ ...overallLayout.item.responsiveMostRightColumn }}>
            <Tooltip title="Remove Bookmark">
              <IconButton
                color="primary"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(bookmarkPost(post._id));
                }}
                sx={{ m: 'auto' }}
              >
                <BookmarkIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </>
      )}
    </Paper>
  );
};

const overallLayout = {
  theMostOuterBox: {
    position: 'relative',
    borderRadius: '12px',
    display: 'flex',
    gap: '10px',
    p: '10px',
    flexDirection: { xs: 'column', sm: 'row' },
    '&:hover': { cursor: 'pointer' },
  },

  mostLeftColumn: {
    m: 'auto 0px',
    flexBasis: '30px',
    flexShrink: '0',
    textAlign: 'center',
    position: 'relative',
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
        zIndex: '0',
      },
    },

    rightColumn: {
      flexGrow: '1',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },

    responsiveMostRightColumn: {
      display: 'flex',
      position: { xs: 'absolute', sm: 'relative' },
      top: '0',
      right: '0',
      m: { xs: '8px', sm: '0' },
    },
  },
};

export default DragItem;
