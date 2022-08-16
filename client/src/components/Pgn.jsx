import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem } from '@mui/material';

import { getPosts } from '../actions/posts';

const Pgn = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page)); //! Main method by which we get the posts and of the correct sequence.
    }
  }, [page]);

  return (
    <>
      <Pagination
        count={numberOfPages}
        page={Number(page) || 1}
        variant="outlined"
        color="primary"
        //Create
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
