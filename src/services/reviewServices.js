import axios from 'axios';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';

const API = axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});

// create a Review
export const createReview = data => API.post('reviews', data);

// get all Reviews
export const getAllReviews = query => API.get(`reviews?${query}`);
