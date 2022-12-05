import axios from 'axios';

//import api endpoint
import {apiEndpoint} from '../utils/constants/APIendpoint';

const API = axios.create({
  baseURL: `${apiEndpoint}chatbot`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const chatWithBot = data => API.post('/chat', data);
