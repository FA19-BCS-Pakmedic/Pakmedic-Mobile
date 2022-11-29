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
