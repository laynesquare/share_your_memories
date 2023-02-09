import {
  useMediaQuery,
  Typography,
  Container,
  useTheme,
  Divider,
  Grow,
  Grid,
  Box,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostsByBookmark } from '../../actions/posts';
import { useEffect } from 'react';
import DropDustbin from './DropDustbin';
import DeleteIcon from '@mui/icons-material/Delete';
import DragItem from './DragItem';
import NotFound from '../NotFound';
import Loading from '../Loading';

const Bookmark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const user =
    JSON.parse(localStorage.getItem('profile'))?.result._id ||
    JSON.parse(localStorage.getItem('profile'))?.result.googleId;

  const { isLoading, posts } = useSelector((state) => {
    const [dirtyPosts, isLoading] = [state.posts.posts, state.posts.isLoading];
    const posts = dirtyPostsCleaUp(dirtyPosts, user);
    return { isLoading, posts };
  });

  useEffect(() => {
    if (!user) return navigate('/auth');
    dispatch(getPostsByBookmark());
  }, [location, user]);

  const BookmarkItems = () => {
    if (isLoading) return <Loading type="small" />;

    if (!posts?.length)
      return (
        <NotFound
          text="You don't have any bookmarks."
          iconSize="10rem"
          textVariant="h6"
        />
      );

    if (posts?.length)
      return (
        <>
          {posts.map((post, idx) => (
            <Grow in key={idx}>
              <Box>
                <DragItem post={post} isLoading={isLoading} idx={idx} />
              </Box>
            </Grow>
          ))}
        </>
      );
  };

  return (
    <>
      <Container maxWidth={isMobile ? 'md' : 'lg'}>
        <Grid container columnSpacing={7} sx={{ position: 'relative' }}>
          <Grid item xs={isMobile ? 12 : 7} sx={{ ...bookmarkStyle.leftGrid }}>
            <Typography variant="h5" fontWeight="bold">
              Your Bookmarks
            </Typography>
            <Divider />
            <BookmarkItems />
          </Grid>

          {!isMobile && (
            <Grid item xs={5} sx={{ ...bookmarkStyle.rightGrid }}>
              <Typography variant="h5" fontWeight="bold">
                Dustbin
              </Typography>
              <Divider sx={{ mt: '1rem' }} />
              {isLoading && (
                <DeleteIcon sx={{ ...bookmarkStyle.rightGrid.deleteIcon }} />
              )}
              {!isLoading && <DropDustbin posts={posts} />}
              <Divider sx={{ mb: '1rem' }} />
              <Typography>
                To unbookmark a post, drag the item, and throw it into the
                dustbin.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

const dirtyPostsCleaUp = (posts, user) =>
  posts.filter((post) => post.bookmark.find((el) => el === user));

const bookmarkStyle = {
  leftGrid: {
    flexDirection: 'column',
    position: 'relative',
    minWidth: '360px',
    display: 'flex',
    gap: '1rem',

    noBookmarkDisplay: {
      textAlign: 'center',
      m: 'auto auto',
    },
  },

  rightGrid: {
    alignSelf: 'flex-start',
    position: 'sticky',
    top: '1rem',

    deleteIcon: {
      height: '100%',
      width: '100%',
    },
  },
};

export default Bookmark;
