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

//get all prescriptions
export const getAllPrescriptions = query => API.get(`prescriptions?${query}`);

//get prescription by id
export const getPrescriptionById = id => API.get(`prescriptions/${id}`);

//delete prescription
export const deletePrescription = id => API.delete(`prescriptions/${id}`);
