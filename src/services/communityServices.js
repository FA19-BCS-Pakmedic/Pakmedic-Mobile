import axios from 'axios';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';
import deviceStorage from '../utils/helpers/deviceStorage';

const API = axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});

//COMMUNITY API

//get all communities
export const getCommunity = () => API.get('communities');

//join community
export const joinCommunity = id => API.patch(`communities/join/${id}`);

//leave community
export const leaveCommunity = id => API.patch(`communities/leave/${id}`);

//get community by id
export const getCommunityById = id => API.get(`communities/${id}`);

//add post

export const addPost = (id, data) => API.post(`posts/${id}`, data);

//get posts
export const getPosts = data => API.get(`posts/?${data}`);

//get post by id
export const getPostById = id => API.get(`posts/${id}`);
