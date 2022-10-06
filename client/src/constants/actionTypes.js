//Loading checker actions
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';

export const START_LOADING_RECOMMENDATIONS = 'START_LOADING_RECOMMENDATIONS';
export const END_LOADING_RECOMMENDATIONS = 'END_LOADING_RECOMMENDATIONS';

//Main actions
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const LIKEPOST = 'LIKEPOST';
export const BOOKMARK_POST = 'BOOKMARK_POST';
export const FETCH_ALL = 'FETCH_ALL';
export const FETCH_ONE = 'FETCH_ONE';
export const FETCH_POST_BY_SEARCH = 'FETCH_POST_BY_SEARCH';
export const FETCH_POST_BY_BOOKMARK = 'FETCH_POST_BY_BOOKMARK';

//Authentication actions
export const AUTH = 'AUTH';
export const LOGOUT = 'LOGOUT';
export const CREATE_POST_COMMENT = 'CREATE_POST_COMMENT';

//Auth failures actions
export const LOGIN_ALERT_FAILED = 'LOGIN_ALERT_FAILED';
export const LOGIN_ALERT_CLEAR = 'LOGIN_ALERT_CLEAR';
export const SIGNUP_ALERT_FAILED = 'SIGNUP_ALERT_FAILED';
export const SIGNUP_ALERT_CLEAR = 'SIGNUP_ALERT_CLEAR';

//Recommendation actions
export const GET_RECOMMEND_VIDS = 'GET_RECOMMEND_VIDS';
