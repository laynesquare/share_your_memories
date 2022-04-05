import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, AppBar, Typography, Grow, Grid } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import memories from './images/memories.png';
import useStyles from './styles';
import './index.css';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';

const App = () => {
  let theme = createTheme();
  const [currentId, setCurrentId] = useState(null);
  // const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Container maxWidth="lg">
          <AppBar className="appBar" position="static" color="transparent">
            <Typography className="heading" variant="h2" align="center">
              Memories
            </Typography>
            <img className="image" src={memories} alt="memories" height="100" />
          </AppBar>
          <Grow in>
            <Container>
              <Grid
                container
                justifyContent="space-between"
                alignItems="stretch"
                spacing={3}
                className="mainContainer"
              >
                <Grid item xs={12} sm={7}>
                  <Posts setCurrentId={setCurrentId} />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <Form currentId={currentId} setCurrentId={setCurrentId} />
                </Grid>
              </Grid>
            </Container>
          </Grow>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default App;
