import API from '../utils/helpers/axios';

export const createPaymentMethod = (data, id) => {
  return API.post(`/stripe/create-payment-method/${id}`, data);
};

// export const createCustomer = data => {
//   console.log(data);
//   return axios.post('/stripe/create-customer', data);
// };

export const getCustomer = id => {
  return API.get(`/stripe/customers/${id}`);
};

export const payForService = (id, data) => {
  return API.post(`/stripe/pay-for-service/${id}`, data);
}

export const getAllReceivedPayments = (id) => {
  return API.get(`/stripe/doctor-payments/${id}`);
}
