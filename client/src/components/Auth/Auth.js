import React, { useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Button,
  Grow,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { GoogleLogin } from 'react-google-login';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { LOGIN_ALERT_CLEAR } from '../../constants/actionTypes';
import Input from './Input';
import Icon from './icon';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(false);
  const authFailedAlert = useSelector((state) => state.alert);
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(initialState);

    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleLazyLogin = () => {
    dispatch(
      signin({ email: 'johndoe@gmail.com', password: 'johndoe123' }, navigate)
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleShowPassword = () =>
    setShowPassword((preShowPassword) => !preShowPassword);

  const switchMode = () => {
    dispatch({ type: LOGIN_ALERT_CLEAR });
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log('google sign in was unseccessful try again later');
  };

  useEffect(() => {
    dispatch({ type: LOGIN_ALERT_CLEAR });
  }, [location]);

  return (
    <Grow in>
      <Container component="main" maxWidth="xs">
        <Snackbar open={authFailedAlert?.state}>
          <Alert severity="error" sx={{ width: '100%' }}>
            {authFailedAlert.msg}
          </Alert>
        </Snackbar>

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
                  autoFocus={true}
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
              handleShowPassword={handleShowPassword}
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
              I'm kinda busy, so just log me in to a test account.
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

          <GoogleLogin
            clientId="71023974194-dh2gfs56pj3r57lepmlbditonpuplqgg.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                color="secondary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google log in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button
                onClick={switchMode}
                sx={{ '&:hover': { background: 'transparent' } }}
              >
                {isSignup
                  ? 'Already have an account? Log In'
                  : `Don't have an account? Sign up`}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Grow>
  );
};

export default Auth;
