import axios from 'axios';

import {EventEmitter} from 'eventemitter3';

//import api end point
import {apiEndpoint} from '@/utils/constants/APIendpoint';

const instance = axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});

export const eventEmitter = new EventEmitter();

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error.response.data.message);
    if (error.response && (error.response.status === 401 || error.response.data.message === 'You are not logged in! Please log in to get access.')) {
      eventEmitter.emit('logout');
    }
    return Promise.reject(error);
  }
);

export default instance;
