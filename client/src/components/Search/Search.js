import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import { Box, Typography, Container, Divider } from '@mui/material';
import Item from './Item';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import Loading from '../Loading';

const Search = () => {
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const [searchParams] = useSearchParams();
  const { keyword, page } = Object.fromEntries(searchParams); // transform an iterator to an object

  useEffect(() => {
    dispatch(getPostsBySearch(keyword, page));
  }, [searchParams]);

  const searchStyle = {
    noSearchResultIcon: {
      fontSize: '20rem',
    },
  };

  if (isLoading) {
    return <Loading type="big" />;
  }

  return (
    <>
      <Container maxWidth="md">
        {posts.length ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Typography variant="h4" fontWeight="bold">
              Search Results
            </Typography>
            <Divider />
            {posts.map((post, idx) => {
              return <Item post={post} idx={idx} />;
            })}
          </Box>
        ) : (
          <Box textAlign="center">
            <SentimentVeryDissatisfiedIcon
              sx={{ ...searchStyle.noSearchResultIcon }}
            />
            <Typography variant="h4">No posts can be found.</Typography>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Search;
