import { AUTH, LOGOUT } from '../constants/actionTypes';

export const auth = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      //   console.log(action?.data);
      return { ...state, authData: action?.data };

    case LOGOUT:
      console.log('logout');
      localStorage.setItem('profile', JSON.stringify({ ...action?.data })); //does action has data?
      //   console.log(action?.data);
      return { ...state, authData: null };

    default:
      return state;
  }
};
