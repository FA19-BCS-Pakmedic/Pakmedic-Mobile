import axios from 'axios';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';

const API = axios.create({
  baseURL: `${apiEndpoint}patients`,
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
