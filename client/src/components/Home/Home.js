import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../actions/posts';
import { Container, Grow, Grid, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import Pagination from '../Pgn';

//Function searching the query params within the current url.
//This is why when the user enters the url, the page will be directed to the correct page automatically.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Get the url query params regarding the page number.
  const query = useQuery();
  const page = query.get('page') || 1;

  //! The automatic fetching is moved into the pagination component.
  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  return (
    <div>
      <Grow in>
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
            className="mainContainer"
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              <Paper elevation={6}>
                <Pagination page={page} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </div>
  );
};

export default Home;
