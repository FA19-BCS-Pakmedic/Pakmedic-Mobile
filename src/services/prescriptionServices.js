import axios from 'axios';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';

const API = axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});

//PRESCRIPTION API

//add prescription
export const addPrescription = data => API.post('prescriptions', data);
