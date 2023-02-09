import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use(
  (req) => {
    if (localStorage.getItem('profile')) {
      req.headers.authorization = `Bearer ${
        JSON.parse(localStorage.getItem('profile')).token
      }`;
    }
    return req;
  },
  (error) => console.log(error)
);

export const fetchPost = (id) => {
  return API.get(`/posts/detail/${id}`);
};

export const fetchPosts = (page) => {
  return API.get(`/posts?page=${page}`);
};

export const fetchPostsBySearch = (keyword, page) => {
  return API.get(`/posts/search/?keyword=${keyword}&page=${page}&`);
};

export const fetchPostsByBookmark = () => {
  return API.get('/posts/bookmark');
};

export const createPost = (newPost) => {
  return API.post('/posts', newPost);
};

export const updatePost = (id, updatedPost) => {
  return API.patch(`posts/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`posts/${id}`);
};

export const likePost = (id) => {
  return API.patch(`posts/${id}/likePost`);
};

export const bookmarkPost = (id) => {
  return API.patch(`posts/${id}/bookmark`);
};

export const createPostComment = (id, commentPackage) => {
  return API.patch(`posts/${id}/createPostComment`, commentPackage);
};

export const signin = (formData) => {
  return API.post('/user/signin', formData);
};

export const signup = (formData) => {
  return API.post('/user/signup', formData);
};
