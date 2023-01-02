import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Box } from '@material-ui/core';
import AutoLogin from './components/Home/AutoLogin';
import PostDetails from './components/PostDetails/PostDetails';
import Bookmark from './components/Bookmark/Bookmark';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Search from './components/Search/Search';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import './index.css';

const App = () => {
  let user = JSON.parse(localStorage.getItem('profile'));

  // useEffect(() => {
  //   user = JSON.parse(localStorage.getItem('profile'));
  // }, [user]);

  // const [user] = useState(JSON.parse(localStorage.getItem('profile')));

  // console.log(first)

  return (
    <BrowserRouter>
      <AutoLogin user={user ? true : false} />
      <Navbar />
      <Box sx={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />}></Route>
          <Route path="/posts" element={<Home />}></Route>
          <Route path="/posts/detail/:postId" element={<PostDetails />}></Route>
          <Route path="/posts/search/" element={<Search />}></Route>
          <Route path="/posts/bookmark/" element={<Bookmark />}></Route>
          <Route
            path="/auth"
            element={!user ? <Auth /> : <Navigate to="/posts" replace />}
          ></Route>
          <Route
            path="posts/deleteRedirect"
            element={<Navigate to={-1} replace />}
          ></Route>
          <Route
            path="*"
            element={
              <NotFound
                text="404 Page Not Found"
                iconSize="10rem"
                textVariant="h4"
              />
            }
          />
        </Routes>
      </Box>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
