import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getPostsByBookmark } from '../../actions/posts';
import { Box, CircularProgress, Typography } from '@mui/material';
import DragItem from './DragItem';
import DropDustbin from './DropDustbin';

const Bookmark = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { posts, isLoading } = useSelector((state) => state.posts);
  const user = JSON.parse(localStorage.getItem('profile'))?.result._id;
  console.log(posts);

  useEffect(() => {
    dispatch(getPostsByBookmark());
  }, [location]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <CircularProgress size="2rem" />
      </Box>
    );
  }

  return (
    <>
      <Typography variant="h1">items</Typography>
      {posts.length > 0
        ? posts.map((post) => {
            const doesUserBookmarkThis = post.bookmark.find(
              (eachUser) => eachUser === user
            );
            if (!doesUserBookmarkThis) return null;

            return (
              <>
                <DragItem post={post} />
              </>
            );
          })
        : 'no posts whatsoever'}
      <Typography variant="h1">dustbin</Typography>
      <DropDustbin posts={posts} />
    </>
  );
};

export default Bookmark;
