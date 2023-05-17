import axios from 'axios';

//import api end point
import {apiEndpoint} from '../utils/constants/APIendpoint';

const API = axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});

// create a complaint
export const createComplaint = data => API.post('complaints', data);

// get all complaints
export const getAllComplaints = () => API.get('complaints');

// get a complaint by id
export const getComplaintById = id => API.get(`complaints/${id}`);

// update a complaint

export const updateComplaint = (id, data) =>
  API.patch(`complaints/${id}`, data);

// delete a complaint by id
export const deleteComplaint = id => API.delete(`complaints/${id}`);
