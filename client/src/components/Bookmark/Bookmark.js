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
import { Tooltip } from '@material-ui/core';

const Bookmark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const location = useLocation();
  const mediumSizedWindow = useMediaQuery(theme.breakpoints.down('lg'));
  const user =
    JSON.parse(localStorage.getItem('profile'))?.result._id ||
    JSON.parse(localStorage.getItem('profile'))?.result.googleId;

  let { isLoading, posts } = useSelector((state) => {
    const [dirtyPosts, isLoading] = [state.posts.posts, state.posts.isLoading];
    const posts = dirtyPosts.filter((dirtyPost) =>
      dirtyPost.bookmark.find((el) => el === user)
    );
    return { isLoading, posts };
  });

  useEffect(() => {
    if (!user) return navigate('/auth');
    dispatch(getPostsByBookmark());
  }, [location, user]);

  const BookmarkItems = () => {
    if (isLoading) return <Loading type="small" />;

    if (posts?.length === 0)
      return (
        <NotFound
          text="You don't have any bookmarks."
          iconSize="10rem"
          textVariant="h6"
        />
      );

    if (posts?.length > 0) {
      return (
        <>
          {posts.map((post, idx) => {
            const doesUserBookmarkThis = post.bookmark.find(
              (eachUser) => eachUser === user
            );

            if (!doesUserBookmarkThis) return null;

            return (
              <Grow in>
                <Box key={idx}>
                  <DragItem post={post} isLoading={isLoading} idx={idx} />
                </Box>
              </Grow>
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      <Container maxWidth={mediumSizedWindow ? 'md' : 'lg'}>
        <Grid container columnSpacing={7} sx={{ position: 'relative' }}>
          <Grid
            item
            xs={mediumSizedWindow ? 12 : 7}
            sx={{ ...bookmarkStyle.leftGridItems }}
          >
            <Typography variant="h5" fontWeight="bold">
              Your Bookmarks
            </Typography>
            <Divider />
            <BookmarkItems />
          </Grid>

          {!mediumSizedWindow && (
            <Grid
              item
              xs={5}
              sx={{
                alignSelf: 'flex-start',
                position: 'sticky',
                top: '1rem',
              }}
            >
              <Typography variant="h5" fontWeight="bold">
                Dustbin
              </Typography>
              <Divider sx={{ mt: '1rem' }} />
              <Box>
                {!isLoading ? (
                  <DropDustbin posts={posts} />
                ) : (
                  <Box sx={{ width: '100%', height: '100%' }}>
                    <DeleteIcon sx={{ width: '100%', height: '100%' }} />
                  </Box>
                )}
              </Box>
              <Box>
                <Divider sx={{ mb: '1rem' }} />
                <Typography textAlign="">
                  To unbookmark a post, drag the item, and throw it into the
                  dustbin.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
};

const bookmarkStyle = {
  leftGridItems: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    minWidth: '360px',

    noBookmarkDisplay: {
      textAlign: 'center',
      m: 'auto auto',
    },
  },
};

export default Bookmark;
