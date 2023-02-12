import { AUTH, LOGOUT, SIGNING } from '../constants/actionTypes';

export const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    case SIGNING:
      return { ...state, authData: SIGNING };

    default:
      return state;
  }
};
