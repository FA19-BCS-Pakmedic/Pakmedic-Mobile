import axios from 'axios';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';

const API = axios.create({
  baseURL: `${apiEndpoint}doctors`,
});

//endpoint for doctor pmc id verification
export const pmcIdVerifyDoctor = data => API.post('/pmc/verify', data);

//endpoint for doctor registration
export const registerDoctor = data => API.post('/register', data);

//endpoint for doctor login
export const loginDoctor = data => API.post('/login', data);

//send forgot password verification code
export const forgotPasswordDoctor = data => API.patch('/forgot-password', data);

//verify otp endpoint
export const verifyOtpDoctor = data =>
  API.get('/verify-otp', {params: {email: data?.email, otp: data?.otp}});

//send reset forgot password
export const resetForgotPasswordDoctor = data =>
  API.patch('/reset-forgotten-password', data);
