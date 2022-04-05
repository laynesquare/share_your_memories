import {
  FETCH_ALL,
  CREATE,
  DELETE,
  LIKEPOST,
  UPDATE,
} from '../constants/actionTypes';

export const posts = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; // now the posts updated to posts = action.payload(remember data has array bracket)
    case CREATE:
      return [...posts, action.payload];
    case UPDATE:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
    case LIKEPOST:
      return posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
    default:
      return posts;
  }
};
