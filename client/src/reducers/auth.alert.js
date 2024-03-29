import {
  SIGNUP_ALERT_FAILED,
  LOGIN_ALERT_FAILED,
  LOGIN_ALERT_CLEAR,
} from '../constants/actionTypes';

export const alert = (state = { state: false, msg: '' }, action) => {
  switch (action.type) {
    case LOGIN_ALERT_FAILED:
      return { state: true, msg: 'Either e-mail or password is incorrect.' };
    case LOGIN_ALERT_CLEAR:
      return { ...state, state: false };
    case SIGNUP_ALERT_FAILED:
      return {
        state: true,
        msg: `E-mail already exists or password doesn't match confirm password.`,
      };
    default:
      return state;
  }
};
