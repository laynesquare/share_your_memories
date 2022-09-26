import {
  FETCH_ALL,
  FETCH_ONE,
  FETCH_POST_BY_SEARCH,
  FETCH_POST_BY_BOOKMARK,
  CREATE,
  CREATE_POST_COMMENT,
  DELETE,
  LIKEPOST,
  UPDATE,
  BOOKMARK_POST,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes';

export const posts = (
  state = { isLoading: true, posts: [], post: [] },
  action
) => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ONE:
      return { ...state, posts: action.payload };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }; // now the posts updated to posts = action.payload(remember data has array bracket)
    case FETCH_POST_BY_SEARCH:
      return { ...state, posts: [...action.payload] };
    case FETCH_POST_BY_BOOKMARK:
      return { ...state, posts: [...action.payload] };
    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case CREATE_POST_COMMENT:
      return { ...state, posts: action.payload };
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    case LIKEPOST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case BOOKMARK_POST:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    default:
      return state;
  }
};
