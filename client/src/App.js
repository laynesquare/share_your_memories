import { HashRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { Box } from '@material-ui/core';
import PostDetails from './components/PostDetails/PostDetails';
import AutoLogin from './components/Home/AutoLogin';
import NotFound from './components/NotFound';
import Bookmark from './components/Bookmark/Bookmark';
import Signing from './components/Auth/Signing';
import Search from './components/Search/Search';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import './index.css';

const App = () => {
  return (
    <HashRouter>
      <AutoLogin />
      <Signing />
      <Navbar />
      <Box sx={{ minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/posts" element={<Home />}></Route>
          <Route path="/posts/search/" element={<Search />}></Route>
          <Route path="/posts/bookmark/" element={<Bookmark />}></Route>
          <Route path="/posts/detail/:postId" element={<PostDetails />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
      <Footer />
    </HashRouter>
  );
};

export default App;
