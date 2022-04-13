import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, Button } from '@mui/material';

import { getPosts } from '../actions/posts';

const Pgn = ({ page }) => {
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) {
      dispatch(getPosts(page));
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
          console.log(item, 'all the item');
          return (
            <PaginationItem
              //Pass the props to the PaginationItem
              {...item}
              component={Link}
              to={`/posts?page=${item.page}`}
            />
          );
        }}
      />

      <Button
        onClick={() => {
          dispatch(getPosts(1));
        }}
      >
        send
      </Button>
    </>
  );
};

export default Pgn;
