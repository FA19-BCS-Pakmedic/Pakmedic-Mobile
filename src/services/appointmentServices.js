import API from '../utils/helpers/axios';

export const createAppointment = data => {
  return API.post('/appointments', data);
};

export const getAppointmentsByUserId = query => {
  return API.get(`appointments?${query}`);
};

export const createAppointmentRequest = data => {
  return API.post('/appointments/requests', data);
};

export const updateAppointmentRequest = (id, data) => {
  return API.patch(`/appointments/requests/${id}`, data);
};

export const getAppointmentRequests = query => {
  return API.get(`/appointments/requests?${query}`);
};

export const getAppointmentById = id => API.get(`/appointments/${id}`);