import {
  FETCH_POST_BY_BOOKMARK,
  FETCH_POST_BY_SEARCH,
  FETCH_ALL,
  FETCH_ONE,
  CREATE,
  CREATE_POST_COMMENT,
  DELETE,
  LIKEPOST,
  BOOKMARK_POST,
  UPDATE,
  START_LOADING,
  END_LOADING,
  START_LOADING_COMMENTS,
  END_LOADING_COMMENTS,
} from '../constants/actionTypes';
import * as api from '../api';

export const getPost = (postId, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPost(postId);
    dispatch({ type: FETCH_ONE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    navigate(-1);
    console.log(error);
  }
};

export const getPosts = (page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPosts(page);
    dispatch({ type: FETCH_ALL, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = (keyword, page) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsBySearch(keyword, page);
    dispatch({ type: FETCH_POST_BY_SEARCH, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const getPostsByBookmark = () => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.fetchPostsByBookmark();
    console.log('fetch implemented');
    dispatch({ type: FETCH_POST_BY_BOOKMARK, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    dispatch({ type: CREATE, payload: data });
    navigate('/');
  } catch (error) {
    console.log(error.message);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatePost(id, post);

    console.log(data);
    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = (id, navigate) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
    dispatch({ type: END_LOADING });
    navigate('/posts/deleteRedirect');
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.likePost(id);
    dispatch({ type: LIKEPOST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const bookmarkPost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.bookmarkPost(id);
    dispatch({ type: BOOKMARK_POST, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const createPostComment = (id, commentPackage) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING_COMMENTS });
    let { data } = await api.createPostComment(id, commentPackage);
    dispatch({ type: CREATE_POST_COMMENT, payload: data });
    dispatch({ type: END_LOADING_COMMENTS });
  } catch (error) {
    console.log(error);
  }
};
