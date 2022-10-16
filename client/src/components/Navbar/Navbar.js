import {
  AppBar,
  Typography,
  Box,
  Button,
  Avatar,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Link,
  useNavigate,
  useLocation,
  createSearchParams,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import decode from 'jwt-decode';

const navBarStyle = {
  mostOuterBox: {
    flexGrow: 1,
    mb: '2rem',
  },

  toolbar: {
    borderBottom: '3px solid #36383F',
    backgroundColor: '#232529',
  },

  siteNameWithLogo: {
    flexGrow: 1,
    textDecoration: 'none',
    fontWeight: 'bold',
    letterSpacing: '0.1rem',
    display: 'flex',
    alignItems: 'center',

    fontBox: {
      display: { xs: 'none', sm: 'block' },
    },

    icon: {
      mr: '1rem',
    },
  },

  textField: {
    borderBottom: '1px solid grey',
    maxWidth: '10rem',
  },

  userAvatar: {
    mr: '1rem',
    width: '1.5rem',
    height: '1.5rem',
    display: { xs: 'none', sm: 'flex' },
    fontSize: '0.8rem',
  },

  userName: {
    mr: '0.5rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    letterSpacing: '0.1rem',
  },

  logInLogOutBtn: {
    backgroundImage: 'linear-gradient(45deg, #D38312 , #A83279 )',
    border: 0,
    borderRadius: 10,
    color: '#DDDEE2',
    fontSize: '0.8rem',
    textTransform: 'none',
    transition: 'all 0.3s',
    letterSpacing: '0.1rem',
    fontWeight: 'bold',
    padding: '0.4rem 0.7rem',
    whiteSpace: 'nowrap',

    '&:hover': {
      transform: 'translate(0, -0.25em)',
    },
  },
};

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [keywordForPostSearch, setKeywordForPostSearch] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
    setUser(null);
  };

  const handleSearchPostByKeyword = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      if (!keywordForPostSearch) return;
      navigate({
        pathname: 'posts/search/',
        search: `?${createSearchParams({
          keyword: keywordForPostSearch,
          page: 1,
        })}`,
      });
    }
  };

  const handleGoToFav = () => navigate('/posts/bookmark');

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
    <Box sx={{ ...navBarStyle.mostOuterBox }}>
      <AppBar position="static">
        <Toolbar sx={{ ...navBarStyle.toolbar }}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            color="textPrimary"
            sx={{ ...navBarStyle.siteNameWithLogo }}
          >
            <MemoryRoundedIcon sx={{ ...navBarStyle.siteNameWithLogo.icon }} />
            <Box sx={{ ...navBarStyle.siteNameWithLogo.fontBox }}>
              Share Your Memories
            </Box>
          </Typography>
          <Box sx={{ display: 'flex' }}>
            <InputBase
              size="small"
              autoComplete="off"
              placeholder="Search something..."
              onKeyDown={handleSearchPostByKeyword}
              value={keywordForPostSearch}
              onChange={(e) => setKeywordForPostSearch(e.target.value)}
              sx={{ ...navBarStyle.textField }}
            />
            <Tooltip title="Search">
              <IconButton
                size="small"
                sx={{ mr: '0.5rem' }}
                onClick={handleSearchPostByKeyword}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {user?.result ? ( //does user has result?
              <>
                <Divider orientation="vertical" flexItem sx={{ mr: '1rem' }} />
                <Avatar
                  alt={user.result.name}
                  src={user.result.imgUrl}
                  sx={{ ...navBarStyle.userAvatar }}
                >
                  {user?.result?.name?.charAt(0)}
                </Avatar>

                <Typography variant="h7" sx={{ ...navBarStyle.userName }}>
                  {user?.result.name}
                </Typography>

                <Tooltip
                  title="Check your favorite posts"
                  fontFamily="Montserrat"
                  sx={{ fontFamily: 'Montserrat', fontWeight: 'lighter' }}
                >
                  <IconButton onClick={handleGoToFav} sx={{ mr: '0.5rem' }}>
                    <BookmarkIcon size="small" />
                  </IconButton>
                </Tooltip>

                <Divider orientation="vertical" flexItem sx={{ mr: '1rem' }} />

                <Button
                  variant="contained"
                  onClick={logout}
                  sx={{ ...navBarStyle.logInLogOutBtn }}
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
                  sx={{ ...navBarStyle.logInLogOutBtn }}
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
