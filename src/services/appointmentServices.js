import axios from 'axios';

import {apiEndpoint} from '../utils/constants/APIendpoint';

const API = axios.create({
  baseURL: `${apiEndpoint}`,

  withCredentials: true,
});

export const createAppointment = data => {
  return API.post('/appointments', data);
};

export const getAppointmentsByUserId = query => {
  return API.get(`appointments?${query}`);
};
