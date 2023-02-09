import {
  Typography,
  Snackbar,
  Button,
  Alert,
  Grid,
  Grow,
  Box,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGIN_ALERT_CLEAR, AUTH } from '../../constants/actionTypes';
import { useState, useEffect } from 'react';
import { signin, signup } from '../../actions/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import decode from 'jwt-decode';

const Auth = () => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const authFailedAlert = useSelector((state) => state.alert);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLazyLogin = () => dispatch(signin(lazyLoginInfo, navigate));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) return dispatch(signup(formData, navigate));
    dispatch(signin(formData, navigate));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    dispatch({ type: LOGIN_ALERT_CLEAR });
    setShowPassword(false);
  }, [location, isSignup]);

  if (user) return navigate(-1);

  return (
    <Grow in>
      <Box sx={{ width: { xs: 360 }, m: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: '1rem' }}>
          <LockOutlinedIcon
            color={authFailedAlert?.state ? 'error' : 'primary'}
            sx={{ fontSize: '2rem' }}
          />
        </Box>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center' }}>
          {isSignup ? 'Sign up' : 'Log in'}
        </Typography>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ mb: '2rem' }}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              handleShowPassword={() => setShowPassword((pre) => !pre)}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Confirm Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
              />
            )}
          </Grid>

          {!isSignup && (
            <Button
              onClick={handleLazyLogin}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mb: '1rem', fontSize: '1.5rem' }}
            >
              I'm busy, so log me into a test account.
            </Button>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: '1rem' }}
          >
            {isSignup ? 'Sign up' : 'Sign in'}
          </Button>

          {!isSignup && <GoogleAuth />}

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={() => setIsSignup((pre) => !pre)}
                sx={{ '&:hover': { background: 'transparent' } }}
              >
                {isSignup
                  ? 'Already have an account? Log In'
                  : `Don't have an account? Sign up`}
              </Button>
            </Grid>
          </Grid>
        </form>

        <Snackbar open={authFailedAlert?.state}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {authFailedAlert.msg}
          </Alert>
        </Snackbar>
      </Box>
    </Grow>
  );
};

const GoogleAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCallbackRes(res) {
    const token = res.credential;
    const { sub: googleId, ...otherProps } = decode(res.credential);
    const result = { googleId, ...otherProps };
    dispatch({ type: AUTH, data: { result, token } });
    navigate('/');
  }

  useEffect(() => {
    /* global google*/
    google.accounts.id.initialize({
      client_id:
        '71023974194-dh2gfs56pj3r57lepmlbditonpuplqgg.apps.googleusercontent.com',
      callback: handleCallbackRes,
    });
    google.accounts.id.prompt();
    google.accounts.id.renderButton(document.getElementById('signInDiv'), {
      text: 'signin_with',
      width: document.getElementById('signInDiv').offsetWidth,
    });
  }, []);

  return <Box id="signInDiv" sx={{ height: 40 }}></Box>;
};

const lazyLoginInfo = { email: 'johndoe@gmail.com', password: 'johndoe123' };

export default Auth;
