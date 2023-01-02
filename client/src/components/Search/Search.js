import { Box, Typography, Container, Divider, Grow } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import NotFound from '../NotFound';
import Loading from '../Loading';
import Item from './Item';

const Search = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [searchParams] = useSearchParams();
  const { keyword, page } = Object.fromEntries(searchParams); // transform an iterator to an object

  useEffect(() => {
    dispatch(getPostsBySearch(keyword, page));
  }, [searchParams]);

  if (isLoading) return <Loading type="big" />;

  return (
    <Container maxWidth="md" sx={{ minWidth: '360px' }}>
      {posts.length ? (
        <Grow in>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Typography variant="h5" fontWeight="bold">
              Search Results
            </Typography>

            <Divider />

            {posts.map((post, idx) => (
              <Item post={post} idx={idx} />
            ))}
          </Box>
        </Grow>
      ) : (
        <NotFound
          text="Can't find any posts."
          iconSize="10rem"
          textVariant="h4"
        />
      )}
    </Container>
  );
};

export default Search;
