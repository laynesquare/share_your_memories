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
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const handleRemoveBookmark = (whatItem) => dispatch(bookmarkPost(whatItem));

  const [_, drag] = useDrag(() => ({
    type: post._id,
    end: (item, monitor) => {
      const itemDropped = monitor.didDrop();
      const whatItem = monitor.getItemType();
      if (itemDropped) handleRemoveBookmark(whatItem);
    },
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
      <Box sx={{ ...overallLayout.item.leftColumn(isHover, post._id) }}>
        <ImgOrSkeleton
          isImgLoaded={isImgLoaded}
          setIsImgLoaded={setIsImgLoaded}
          selectedFile={post?.selectedFile}
          skeletonStyle={{ ...overallLayout.item.leftColumn.imgSkeleton }}
          imgStyle={{
            ...overallLayout.item.imgAvatar(isHover, post._id, isImgLoaded),
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

      {isMobile && (
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
    position: 'relative',
    m: 'auto 0px',
    index: {
      '&::before': { xs: { content: "'- '" }, sm: { content: "''" } },
      '&::after': { xs: { content: "' -'" }, sm: { content: "''" } },
    },
  },

  item: {
    leftColumn(isHover, postId) {
      return {
        aspectRatio: '3/2',
        flexShrink: '0',
        flexBasis: '130px',
        position: 'relative',

        '&::before': {
          transition: 'ease-in-out 0.1s',
          position: 'absolute',
          bgcolor: 'primary.main',
          content: "''",
          zIndex: '2',
          height: '100%',
          width: isHover === postId ? '3px' : '0px',
          left: '0',
        },

        '&::after': {
          transition: 'ease-in-out 0.3s',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          transform: 'translate(-50%,-50%)',
          position: 'absolute',
          fontSize: '1rem',
          opacity: isHover === postId ? '100%' : '0%',
          content: "'MORE'",
          zIndex: '2',
          left: '50%',
          top: '50%',
        },
      };
    },

    imgSkeleton: {
      height: '100%',
      width: '100%',
    },

    imgAvatar(isHover, postId, isImgLoaded) {
      return {
        borderRadius: '0',
        aspectRatio: '3/2',
        display: isImgLoaded ? '' : 'none',
        filter: isHover === postId ? 'brightness(10%)' : '',
        height: '100%',
        zIndex: '0',
        width: '100%',
      };
    },

    rightColumn: {
      justifyContent: 'space-between',
      flexDirection: 'column',
      flexGrow: '1',
      display: 'flex',
    },

    responsiveMostRightColumn: {
      position: { xs: 'absolute', sm: 'relative' },
      display: 'flex',
      right: '0',
      top: '0',
      m: { xs: '8px', sm: '0' },
    },
  },
};

export default DragItem;
