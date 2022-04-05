import axios from 'axios';

const url = `http://localhost:5000/movies`;

const API = axios.create({ baseURL: 'http://localhost:5000' });

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

export const fetchPosts = () => {
  return API.get(url);
};
export const createPost = (newPost) => {
  return API.post(url, newPost);
  //on the left, it's the url youre making requests to.
  //on the right, its the data sent
};

export const updatePost = (id, updatedPost) => {
  return API.patch(`${url}/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return API.delete(`${url}/${id}`);
};

export const likePost = (id) => {
  return API.patch(`${url}/${id}/likePost`);
};

export const signin = (formData) => {
  return API.post('/user/signin', formData);
};

export const signup = (formData) => {
  return API.post('/user/signup', formData);
};
