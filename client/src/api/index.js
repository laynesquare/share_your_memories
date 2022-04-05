import axios from 'axios';

const url = 'http://localhost:8080/posts';

export const fetchPosts = () => {
  return axios.get(url);
};
export const createPost = (newPost) => {
  return axios.post(url, newPost);
  //on the left, it's the url youre making requests to.
  //on the right, its the data sent
};

export const updatePost = (id, updatedPost) => {
  return axios.patch(`${url}/${id}`, updatedPost);
};

export const deletePost = (id) => {
  return axios.delete(`${url}/${id}`);
};

export const likePost = (id) => {
  return axios.patch(`${url}/${id}/likePost`);
};
