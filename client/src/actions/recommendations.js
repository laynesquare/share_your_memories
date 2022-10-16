import * as api from '../api/recommendations';
import {
  GET_RECOMMEND_VIDS,
  START_LOADING_RECOMMENDATIONS,
  END_LOADING_RECOMMENDATIONS,
} from '../constants/actionTypes';

export const getRecommendedVids = (tagName) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_RECOMMENDATIONS });
    const { data } = await api.getRecommendedVids(tagName);
    dispatch({ type: GET_RECOMMEND_VIDS, payload: data.items });
    dispatch({ type: END_LOADING_RECOMMENDATIONS });
  } catch (error) {
    console.log(error);
    dispatch({ type: END_LOADING_RECOMMENDATIONS });
  }
};
