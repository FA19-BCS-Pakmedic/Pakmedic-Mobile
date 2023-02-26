import axios from 'axios';

//import helper function
import deviceStorage from '../utils/helpers/deviceStorage';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';

const getToken = async () => {
  return await deviceStorage.loadItem('jwtToken');
};

// axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

const API = axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});

//endpoint for doctor pmc id verification
export const pmcIdVerifyDoctor = data => API.post('doctors/pmc/verify', data);

//endpoint for doctor registration
export const registerDoctor = data => API.post('doctors/register', data);

//endpoint for doctor login
export const loginDoctor = data => API.post('doctors/login', data);

//send forgot password verification code
export const forgotPasswordDoctor = data =>
  API.patch('doctors/forgot-password', data);

//verify otp endpoint
export const verifyOtpDoctor = data =>
  API.get('doctors/verify-otp', {params: {email: data?.email, otp: data?.otp}});

//send reset forgot password
export const resetForgotPasswordDoctor = data =>
  API.patch('doctors/reset-forgotten-password', data);

//get doctor if he is logged in
export const getDoctor = () => API.get('doctors');

//add service
export const addService = data => API.post('/services', data);

//get services based on doctor's id
export const getServices = id => API.get(`/services/doctors/${id}`);

// get service by id
export const getServiceById = id => API.get(`/services/${id}`);

// update service
export const updateService = (id, data) => API.patch(`/services/${id}`, data);
