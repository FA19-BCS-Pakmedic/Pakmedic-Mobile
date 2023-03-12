import axios from 'axios';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';
import deviceStorage from '../utils/helpers/deviceStorage';

const API = axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});

//add post

export const addPost = data => API.post('posts/640de402d3ed2e3aa5bf6e9c', data);

//get Community posts

export const getCommunityPosts = () =>
  API.get('posts/communities/640de402d3ed2e3aa5bf6e9c');
