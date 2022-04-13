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
  (error) => {
    return console.log(error);
  }
);

export const fetchPosts = (page) => {
  return API.get(`/posts?page=${page}`);
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

export const signin = (formData) => {
  return API.post('/user/signin', formData);
};

export const signup = (formData) => {
  return API.post('/user/signup', formData);
};
