import API from '../utils/helpers/axios';

//COMMUNITY API

//get all communities
export const getCommunity = () => API.get('communities');

//join community
export const joinCommunity = id => API.patch(`communities/join/${id}`);

//leave community
export const leaveCommunity = id => API.patch(`communities/leave/${id}`);

//get community by id
export const getCommunityById = id => API.get(`communities/${id}`);

//POSTS API

//add post
export const addPost = (id, data) => API.post(`posts/${id}`, data);

//get posts
export const getPosts = data => API.get(`posts/?${data}`);

//get post by id
export const getPostById = id => API.get(`posts/${id}`);

//delete post
export const deletePost = id => API.delete(`posts/${id}`);

//Comments API

//add comment
export const addComment = (pid, cid, data) =>
  API.post(`comments/${pid}/${cid}`, data);
