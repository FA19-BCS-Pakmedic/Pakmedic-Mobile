import axios from 'axios';

import {apiEndpoint} from '../utils/constants/APIendpoint';

const API = axios.create({
  baseURL: `${apiEndpoint}`,

  withCredentials: true,
});

export const getAppointmentsByUserId = data => {
  console.log(data);

  return API.get(`appointments/?${data}`);
};
