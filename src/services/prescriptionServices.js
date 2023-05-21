import API from '../utils/helpers/axios';

//PRESCRIPTION API

//add prescription
export const addPrescription = data => API.post('prescriptions', data);

//get all prescriptions
export const getAllPrescriptions = query => API.get(`prescriptions?${query}`);

//get prescription by id
export const getPrescriptionById = id => API.get(`prescriptions/${id}`);

//delete prescription
export const deletePrescription = id => API.delete(`prescriptions/${id}`);
