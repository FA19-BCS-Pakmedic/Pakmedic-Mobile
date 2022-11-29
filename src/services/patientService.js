import axios from 'axios';

const API = axios.create({
  baseURL: 'http://192.168.228.86:8000/api/v1/patients',
});

//register a patient
export const registerPatient = post => API.post('/register', post);

//login a patient
export const loginPatient = post => API.post('/login', post);
