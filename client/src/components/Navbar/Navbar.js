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

  const handleGoToFav = () => navigate('/posts/bookmark');

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
                size="small"
                autoComplete="off"
                placeholder="Search something..."
                onKeyDown={handleSearchPostByKeyword}
                value={keywordForPostSearch}
                onChange={(e) => setKeywordForPostSearch(e.target.value)}
                sx={{
                  ...navBarStyle.textField,
                  opacity: searchInputShow ? '1' : '0',
                  transform: searchInputShow ? '0' : 'translateX(20%)',
                }}
              />
              <Tooltip title="Search">
                <IconButton
                  onClick={handleSearchPostByKeyword}
                  sx={{
                    ...navBarStyle.searchIcon,
                    borderRadius: searchInputShow ? '0px 10px 10px 0' : '10px',
                  }}
                >
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>

            {user?.result && (
              <Tooltip title="Check your favorite posts">
                <IconButton
                  onClick={handleGoToFav}
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

            {user?.result ? ( //does user has result?
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
              <>
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

const navBarStyle = {
  mostOuterBox: {
    flexGrow: 1,
    mb: '2rem',
    minWidth: { xs: 360 },
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
    icon: { mr: '1rem' },
    fontBox: { display: { xs: 'none', md: 'block' } },
  },

  menuBox: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '10px',
  },

  textField: {
    transition: 'all 0.5s',
    borderWidth: '1px 0px 1px 1px',
    borderStyle: 'solid',
    borderColor: '#757575',
    borderRadius: '10px 0px 0px 10px',
    fontSize: '0.8rem',
    p: '0 10px',
  },

  searchIcon: {
    borderWidth: '1px',
    borderStyle: 'solid',
    borderColor: '#757575',
    transition: 'all 0.5s',
  },

  bookmarkIcon: {
    border: '1px solid #757575',
    borderRadius: '10px',
  },

  userAvatar: {
    width: '1.5rem',
    height: '1.5rem',
    fontSize: '0.8rem',
    display: { xs: 'none', md: 'flex' },
  },

  userName: {
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    letterSpacing: '0.1rem',
    display: { xs: 'none', md: 'flex' },
  },

  logInLogOutBtn: {
    backgroundImage: 'linear-gradient(45deg, #D38312 , #A83279)',
    flexShrink: '0',
    borderRadius: '16px',
    color: '#DDDEE2',
    fontSize: '0.8rem',
    transition: 'all 0.3s',
    letterSpacing: '0.1rem',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',

    '&:hover': {
      transform: 'translate(0, -0.25em)',
    },
  },
};

export default Navbar;
