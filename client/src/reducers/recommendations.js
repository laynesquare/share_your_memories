import {
  GET_RECOMMEND_VIDS,
  START_LOADING_RECOMMENDATIONS,
  END_LOADING_RECOMMENDATIONS,
  CLEANUP_RECOMMEND_VIDS,
} from '../constants/actionTypes';

export const recommendations = (
  state = { isLoading: true, vids: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING_RECOMMENDATIONS:
      return { ...state, isLoading: true };
    case END_LOADING_RECOMMENDATIONS:
      return { ...state, isLoading: false };
    case GET_RECOMMEND_VIDS:
      return { ...state, vids: action.payload };
    case CLEANUP_RECOMMEND_VIDS:
      return { ...state, isLoading: false, vids: [] };
    default:
      return state;
  }
};
