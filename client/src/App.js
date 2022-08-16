import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';

import './index.css';

const App = () => {
  let user;
  useEffect(() => {
    user = JSON.parse(localStorage.getItem('profile'));
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />}></Route>
        <Route path="/posts" element={<Home />}></Route>
        <Route path="/posts/:postId" element={<PostDetails />}></Route>
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/posts" replace />}
        ></Route>
        <Route
          path="posts/deleteRedirect"
          element={<Navigate to={-1} replace />}
        ></Route>
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
