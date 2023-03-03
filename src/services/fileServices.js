import axios from 'axios';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';
import deviceStorage from '../utils/helpers/deviceStorage';

const getToken = async () => {
  return await deviceStorage.loadItem('jwtToken');
};

// axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

const API = axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});

//get file from the backend
export const getFile = async filename => {
  return await API.get(`/files/${filename}`);
};
