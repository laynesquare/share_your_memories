import {
  SIGNUP_ALERT_FAILED,
  LOGIN_ALERT_FAILED,
  SIGNING,
  LOGOUT,
  AUTH,
} from '../constants/actionTypes';
import * as api from '../api';

export const signin = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SIGNING });
    const { data } = await api.signin(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    dispatch({ type: LOGOUT });
    dispatch({ type: LOGIN_ALERT_FAILED });
    console.log(error);
  }
};

export const signup = (formData, navigate) => async (dispatch) => {
  try {
    dispatch({ type: SIGNING });
    const { data } = await api.signup(formData);
    dispatch({ type: AUTH, data });
    navigate('/');
  } catch (error) {
    dispatch({ type: LOGOUT });
    dispatch({ type: SIGNUP_ALERT_FAILED });
    console.log(error);
  }
};
