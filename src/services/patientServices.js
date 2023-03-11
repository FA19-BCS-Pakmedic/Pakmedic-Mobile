import axios from 'axios';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';
import deviceStorage from '../utils/helpers/deviceStorage';

const getToken = async () => {
  return await deviceStorage.loadItem('jwtToken');
};

// axios.defaults.headers.common['Authorization'] = `Bearer ${getToken()}`;

const API = axios.create({
  baseURL: `${apiEndpoint}patients`,
  withCredentials: true,
});

//register a patient
export const registerPatient = data => API.post('/register', data);

//login a patient
export const loginPatient = data => API.post('/login', data);

//send forgot password verification code
export const forgotPasswordPatient = data =>
  API.patch('/forgot-password', data);

//verify otp endpoint
export const verifyOtpPatient = data =>
  API.get('/verify-otp', {params: {email: data?.email, otp: data?.otp}});

//send reset forgot password
export const resetForgotPasswordPatient = data =>
  API.patch('/reset-forgotten-password', data);

//get patient if he is logged in
export const getPatient = () => API.get('/');
