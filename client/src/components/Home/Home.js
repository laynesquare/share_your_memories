import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Grow, Grid, Box } from '@mui/material';
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

  //Get the url query params regarding the page number.
  const query = useQuery();
  const page = query.get('page') || 1;

  console.log(query.get('page'));

  return (
    <Container maxWidth="xl">
      <div>
        <Grow in>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} page={page} />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ mb: '2rem' }}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination page={page} />
              </Box>
            </Grid>
          </Grid>
        </Grow>
      </div>
    </Container>
  );
};

export default Home;
