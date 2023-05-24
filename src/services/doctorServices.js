import API from '../utils/helpers/axios';

//endpoint for doctor pmc id verification
export const pmcIdVerifyDoctor = data => API.post('doctors/pmc/verify', data);

//endpoint for doctor registration
export const registerDoctor = data => API.post('doctors/register', data);

//endpoint for doctor login
export const loginDoctor = data => API.post('doctors/login', data);

//send forgot password verification code
export const forgotPasswordDoctor = data =>
  API.patch('doctors/forgot-password', data);

//verify otp endpoint
export const verifyOtpDoctor = data =>
  API.get('doctors/verify-otp', {params: {email: data?.email, otp: data?.otp}});

//send reset forgot password
export const resetForgotPasswordDoctor = data =>
  API.patch('doctors/reset-forgotten-password', data);

//get doctor if he is logged in
export const getDoctor = () => API.get('doctors');

export const getDoctors = () => API.get('doctors/all');

//get doctor by id
export const getDoctorById = id => API.get(`doctors/${id}`);

//update doctor data
export const updateDoctor = data => API.patch(`doctors`, data);

//add service
export const addService = data => API.post('/services', data);

//get services based on doctor's id
export const getServices = id => API.get(`/services/doctors/${id}`);

// get service by id
export const getServiceById = id => API.get(`/services/${id}`);

// update service
export const updateService = (id, data) => API.patch(`/services/${id}`, data);

//delete service
export const deleteService = id => API.delete(`/services/${id}`);

//add treatment
export const addTreatment = data => API.post('/doctors/treatments', data);

// add experience
export const addExperience = data => API.post('/experiences', data);

//get experience based on id
export const getExperienceByID = id => API.get(`/experiences/${id}`);

//update experience based on id
export const updateExperience = (id, data) =>
  API.patch(`/experiences/${id}`, data);

//delete experience based on id
export const deleteExperience = id => API.delete(`/experiences/${id}`);

//add avatar
export const addAvatar = data => {
  return API.post('/doctors/avatar', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

//add signature
export const addSignature = data => {
  return API.post('/doctors/signatures', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

//filter doctors
export const filterDoctors = query => {
  return API.get(`/doctors/filter/?${query}`);
};

export const retinopathy = data => {
  user = {user: Object.values(data).map(value => parseFloat(value))};

  return API.post('ML/retinopathy', user);
};

export const riskOfDeath = data => {
  const keys = [
    'Age',
    'DiastolicBP',
    'PovertyIndex',
    'Race',
    'RedBloodCells',
    'SedimentationRate',
    'SerumAlbumin',
    'SerumCholesterol',
    'SerumIron',
    'SerumMagnesium',
    'SerumProtein',
    'Sex',
    'SystolicBP',
    'TIBC',
    'TransferrinSaturation',
    'WhiteBloodCells',
    'BMI',
    'PulsePressure',
  ];

  const userValues = keys.map(key => parseFloat(data[key]));
  const user = {user: userValues};

  return API.post('ML/riskOfDeath', user);
};

export const RecommendCompounds = data => {
  return API.post('ML/recommendcompound', {conditions: data});
};

export const Xray = data => {
  const image = data?.file;
  delete data?.file;

  return API.post(`ML/chestXray?name=${image}`, data);
};

export const BrainMRI = data => {
  const image = data?.file;
  delete data?.file;

  return API.post(`ML/brainMRI?name=${image}`, data);
};

export const getNotifications = data => {
  return API.get(`notifications/?user=${data}`);
};

export const getScans = (data, type) => {
  return API.get(`scans/patient/${data}`);
};

export const getDashboardData = (id) => {
  return API.get(`doctors/dashboard/${id}`);
}
