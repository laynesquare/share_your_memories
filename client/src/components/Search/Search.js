import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import { Box, CircularProgress, Typography } from '@mui/material';

const Search = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [searchParams] = useSearchParams();
  const { keyword, page } = Object.fromEntries(searchParams); // transform an iterator to an object

  // console.log(searchParams.entries());
  // checking whether the object has been properly formed, which contain the search params

  useEffect(() => {
    dispatch(getPostsBySearch(keyword, page));
  }, [searchParams]);

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
      {posts.length ? (
        posts.map((post, idx) => {
          return (
            <>
              <Typography>{post.title}</Typography>
            </>
          );
        })
      ) : (
        <Typography>No posts can be found, use another keyword.</Typography>
      )}
      ;
    </>
  );
};

export default Search;
