import React from 'react';
import {
  AppBar,
  Typography,
  Box,
  Button,
  Avatar,
  Divider,
} from '@mui/material';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';

import Toolbar from '@mui/material/Toolbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import { customizedButton } from './styles/custmizedButton';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/auth');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout();
      }
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <Box sx={{ flexGrow: 1, mb: '2rem' }}>
      <AppBar position="static">
        <Toolbar
          sx={{
            borderBottom: '3px solid #36383F',
            backgroundColor: '#232529',
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="textPrimary"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              fontWeight: 'bold',
              letterSpacing: '0.1rem',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <MemoryRoundedIcon sx={{ mr: '1rem' }} />
            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Share Your Memories
            </Box>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user?.result ? ( //does user has result?
              <>
                <Avatar
                  alt={user.result.name}
                  src={user.result.imgUrl}
                  sx={{
                    mr: '1rem',
                    width: '1.5rem',
                    height: '1.5rem',
                    display: { xs: 'none', sm: 'flex' },
                    fontSize: '0.8rem',
                  }}
                >
                  {user?.result?.name?.charAt(0)}
                </Avatar>

                <Typography
                  variant="h7"
                  sx={{
                    mr: '1rem',
                    fontWeight: 'bold',
                    whiteSpace: 'nowrap',
                    letterSpacing: '0.1rem',
                  }}
                >
                  {user?.result.name}
                </Typography>

                <Divider orientation="vertical" flexItem sx={{ mr: '1rem' }} />

                <Button
                  variant="contained"
                  onClick={logout}
                  sx={customizedButton}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Divider orientation="vertical" flexItem sx={{ mr: '1rem' }} />

                <Button
                  component={Link}
                  to="/auth"
                  variant="contained"
                  color="primary"
                  sx={customizedButton}
                >
                  Log in
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
