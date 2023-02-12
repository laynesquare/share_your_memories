import { Container, Grow, Grid, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { SIGNING } from '../../constants/actionTypes';
import Pagination from '../Pgn';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

const Home = () => {
  const isSigning = useSelector((state) => state.auth.authData);
  const [currentId, setCurrentId] = useState(null);
  //Get the url query params regarding the page number.
  const query = useQuery();
  const page = query.get('page') || 1;

  if (isSigning === SIGNING) return null;

  return (
    <Container maxWidth="xl" sx={{ ...homeStyle.mostOuterBox }}>
      <Box>
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

            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              sx={{ ...homeStyle.formAndPagination }}
            >
              <Box sx={{ mb: '2rem' }}>
                <Form currentId={currentId} setCurrentId={setCurrentId} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination page={page} />
              </Box>
            </Grid>
          </Grid>
        </Grow>
      </Box>
    </Container>
  );
};

//Function searching the query params within the current url.
//This is why when the user enters the url, the page will be directed to the correct page automatically.
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const homeStyle = {
  mostOuterBox: {
    minWidth: { xs: 360 },
    mb: '2rem',
  },

  formAndPagination: {
    alignSelf: 'flex-start',
    position: 'sticky',
    top: '5px',
  },
};

export default Home;
