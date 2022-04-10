import {
  LOGIN_ALERT_FAILED,
  LOGIN_ALERT_CLEAR,
  SIGNUP_ALERT_FAILED,
  SIGNUP_ALERT_CLEAR,
} from '../constants/actionTypes';

const initialState = { state: false, msg: 'everthing is fine' };

export const alert = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_ALERT_FAILED:
      return {
        state: true,
        msg: 'Either e-mail or passsword is incorrect.',
      };
    case LOGIN_ALERT_CLEAR:
      return initialState;

    case SIGNUP_ALERT_FAILED:
      return {
        state: true,
        msg: `Either e-mail already exists or password don't match confirm password.`,
      };
    default:
      return state;
  }
};
