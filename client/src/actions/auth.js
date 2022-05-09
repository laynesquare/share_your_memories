import * as api from '../api';
import {
  AUTH,
  LOGIN_ALERT_FAILED,
  SIGNUP_ALERT_FAILED,
} from '../constants/actionTypes';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    // sign in the user
    const { data } = await api.signin(formData);

    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    dispatch({ type: LOGIN_ALERT_FAILED });
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    // sign up the user
    const { data } = await api.signup(formData);

    dispatch({ type: AUTH, data });

    navigate('/');
  } catch (error) {
    dispatch({ type: SIGNUP_ALERT_FAILED });
    console.log(error);
  }
};
