import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate, useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container } from '@mui/material';
import { useEffect } from 'react';
//Components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

//main css
import './index.css';

const App = () => {
  let user;

  useEffect(() => {
    console.log('hook useEffect');
    user = JSON.parse(localStorage.getItem('profile'));
  }, [user]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />}></Route>
        <Route path="/posts" element={<Home />}></Route>
        <Route
          path="/auth"
          element={!user ? <Auth /> : <Navigate to="/posts" replace />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
