import API from '../utils/helpers/axios';

//register a patient
export const registerPatient = data => API.post('patients/register', data);

//login a patient
export const loginPatient = data => API.post('patients/login', data);

//send forgot password verification code
export const forgotPasswordPatient = data =>
  API.patch('patients/forgot-password', data);

//verify otp endpoint
export const verifyOtpPatient = data =>
  API.get('patients/verify-otp', {
    params: {email: data?.email, otp: data?.otp},
  });

//send reset forgot password
export const resetForgotPasswordPatient = data =>
  API.patch('patients/reset-forgotten-password', data);

//get patient if he is logged in
export const getPatient = () => API.get('patients/');

export const getPatients = () => API.get('patients/all');
// add avatar
export const addAvatar = data => API.post('patients/avatar', data);

//get patient by id
export const getPatientById = id => API.get(`patients/${id}`);

//update patient
export const updatePatient = data => API.patch('patients', data);

// add family member
export const addFamilyMember = data => API.post('families', data);

// update family member
export const updateFamilyMember = (id, data) =>
  API.patch(`families/${id}`, data);

//delete family member
export const deleteFamilyMember = id => API.delete(`families/${id}`);

export const addReminder = data => {
  console.log('Add REMINDERRRRRRRRRR', data);
  return API.post('reminder', data);
};

export const getReminders = (user, date) => {
  console.log(user, date);
  return API.get(`reminder?user=${user}&dosageDates=${date}`);
};


export const getDashboardData = (id) => {
  return API.get(`patients/dashboard/${id}`);
}