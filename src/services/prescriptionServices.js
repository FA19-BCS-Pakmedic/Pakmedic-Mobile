import API from '../utils/helpers/axios';

//PRESCRIPTION API

//add prescription
export const addPrescription = data => API.post('prescriptions', data);
