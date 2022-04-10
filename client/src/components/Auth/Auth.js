import React, { useEffect } from 'react';
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Grid,
  Button,
  Checkbox,
  Grow,
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
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
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
        {authFailedAlert?.state === true && <>{authFailedAlert.msg}</>}

        <Paper>
          <Avatar>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignup ? 'sign up' : 'sign in'}
          </Typography>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={2}>
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
                label="password"
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
            <Button type="submit" fullWidth variant="contained" color="primary">
              {isSignup ? 'sign up' : 'sign in'}
            </Button>
            <GoogleLogin
              clientId="71023974194-dh2gfs56pj3r57lepmlbditonpuplqgg.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={<Icon />}
                  variant="contained"
                >
                  google sign in
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? 'Already have an account? Sign In'
                    : `Don't have an account? Sign up`}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grow>
  );
};

export default Auth;
