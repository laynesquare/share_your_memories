import {
  Typography,
  Divider,
  Tooltip,
  AppBar,
  Button,
  Avatar,
  Badge,
  Box,
} from '@mui/material';
import {
  createSearchParams,
  useNavigate,
  useLocation,
  Link,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOGOUT } from '../../constants/actionTypes';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Toolbar from '@mui/material/Toolbar';
import decode from 'jwt-decode';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [keywordForPostSearch, setKeywordForPostSearch] = useState('');
  const [searchInputShow, setSearchInputShow] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({ type: LOGOUT });
    navigate('/auth');
  };

  const handleSearchPostByKeyword = (e) => {
    if (e.keyCode === 13 || e.type === 'click') {
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

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, user]);

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

          <Box sx={{ ...navBarStyle.menuBox }}>
            <Box
              onMouseEnter={() => setSearchInputShow(true)}
              onMouseLeave={() => {
                if (keywordForPostSearch) return;
                setSearchInputShow(false);
              }}
              sx={{ display: 'flex', borderRadius: '10px' }}
            >
              <InputBase
                autoComplete="off"
                placeholder="Search something..."
                size="small"
                value={keywordForPostSearch}
                onKeyDown={handleSearchPostByKeyword}
                onChange={(e) => setKeywordForPostSearch(e.target.value)}
                sx={{ ...navBarStyle.textField(searchInputShow) }}
              />
              <Tooltip title="Search">
                <IconButton
                  onClick={handleSearchPostByKeyword}
                  sx={{ ...navBarStyle.searchIcon(searchInputShow) }}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {user?.result && (
              <Tooltip title="Check your favorite posts">
                <IconButton
                  onClick={() => navigate('/posts/bookmark')}
                  sx={{ ...navBarStyle.bookmarkIcon }}
                >
                  <Badge badgeContent={0} color="primary">
                    <BookmarkIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

            <Divider
              orientation="vertical"
              flexItem
              sx={{ display: { xs: 'none', md: 'block' } }}
            />

            {user?.result ? (
              <>
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

                <Divider orientation="vertical" flexItem />

                <Button
                  variant="contained"
                  onClick={logout}
                  sx={{ ...navBarStyle.logInLogOutBtn }}
                >
                  Log out
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                variant="contained"
                color="primary"
                to="/auth"
                sx={{ ...navBarStyle.logInLogOutBtn }}
              >
                Log in
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const navBarStyle = {
  mostOuterBox: {
    minWidth: { xs: 360 },
    flexGrow: 1,
    mb: '2rem',
  },

  toolbar: {
    backgroundColor: '#232529',
    borderBottom: '3px solid #36383F',
  },

  siteNameWithLogo: {
    textDecoration: 'none',
    letterSpacing: '0.1rem',
    alignItems: 'center',
    fontWeight: 'bold',
    flexGrow: 1,
    display: 'flex',
    fontBox: { display: { xs: 'none', md: 'block' } },
    icon: { mr: '1rem' },
  },

  menuBox: {
    alignItems: 'center',
    columnGap: '10px',
    display: 'flex',
  },

  textField(searchInputShow) {
    return {
      borderRadius: '10px 0px 0px 10px',
      borderWidth: '1px 0px 1px 1px',
      borderStyle: 'solid',
      borderColor: '#757575',
      transition: 'all 0.5s',
      transform: searchInputShow ? '0' : 'translateX(20%)',
      fontSize: '0.8rem',
      opacity: searchInputShow ? '1' : '0',
      p: '0 10px',
    };
  },

  searchIcon(searchInputShow) {
    return {
      borderWidth: '1px',
      borderStyle: 'solid',
      borderColor: '#757575',
      borderRadius: searchInputShow ? '0px 10px 10px 0' : '10px',
      transition: 'all 0.5s',
    };
  },

  bookmarkIcon: {
    borderRadius: '10px',
    border: '1px solid #757575',
  },

  userAvatar: {
    fontSize: '0.8rem',
    display: { xs: 'none', md: 'flex' },
    width: '1.5rem',
    height: '1.5rem',
  },

  userName: {
    letterSpacing: '0.1rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    display: { xs: 'none', md: 'flex' },
  },

  logInLogOutBtn: {
    backgroundImage: 'linear-gradient(45deg, #D38312 , #A83279)',
    letterSpacing: '0.1rem',
    borderRadius: '16px',
    fontWeight: 'bold',
    transition: 'all 0.3s',
    flexShrink: '0',
    whiteSpace: 'nowrap',
    fontSize: '0.8rem',
    color: '#DDDEE2',
    '&:hover': { transform: 'translate(0, -0.25em)' },
  },
};

export default Navbar;
