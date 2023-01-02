import { Pagination, PaginationItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPosts } from '../actions/posts';
import { Link } from 'react-router-dom';

const Pgn = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <>
      <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        renderItem={(item) => {
          return (
            <PaginationItem
              //Pass the props to the PaginationItem
              {...item}
              component={Link}
              //The url is not specifed from react router. It is formed from the pagiantion item,
              //and the useQuery hook is used to get the page number from the url, triggering the useEffect hook
              //and so the getPosts action is dispatched (the BE later sending the data to the reducer).
              to={`/posts?page=${item.page}`}
            />
          );
        }}
      />
    </>
  );
};

export default Pgn;
