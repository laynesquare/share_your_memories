import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPostsByBookmark } from '../../actions/posts';
import { Box, Container, Grid, Typography, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DragItem from './DragItem';
import DropDustbin from './DropDustbin';
import Loading from '../Loading';
import NotFound from '../NotFound';

const Bookmark = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('profile'))?.result._id;
  let { isLoading, posts } = useSelector((state) => {
    const [dirtyPosts, isLoading] = [state.posts.posts, state.posts.isLoading];
    const posts = dirtyPosts.filter((dirtyPost) =>
      dirtyPost.bookmark.find((el) => el === user)
    );
    return { isLoading, posts };
  });

  const location = useLocation();

  useEffect(() => {
    if (!user) return navigate('/auth');

    dispatch(getPostsByBookmark());
  }, [location, user]);

  const bookmarkStyle = {
    leftGridItems: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',

      noBookmarkDisplay: {
        textAlign: 'center',
        m: 'auto auto',
      },
    },
  };

  const BookmarkItems = () => {
    if (isLoading) return <Loading type="small" />;

    if (posts?.length === 0)
      return (
        <>
          <NotFound
            text="You don't have any bookmarks."
            iconSize="10rem"
            textVariant="h6"
          />
        </>
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
              <Box key={idx}>
                <DragItem post={post} isLoading={isLoading} idx={idx} />
              </Box>
            );
          })}
        </>
      );
    }
  };

  return (
    <>
      <Container maxWidth="xl">
        <Grid container columnSpacing={7}>
          <Grid item xs={7} sx={{ ...bookmarkStyle.leftGridItems }}>
            <Typography variant="h4" fontWeight="bold">
              Your Bookmarks
            </Typography>
            <Divider />
            <BookmarkItems />
          </Grid>

          <Grid item xs={5}>
            <Typography variant="h4" fontWeight="bold">
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

              <Typography variant="h5" textAlign="justify">
                To remove a post from your bookmarks, drag the item, and throw
                it into the dustbin.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Bookmark;
