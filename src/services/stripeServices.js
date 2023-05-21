import axios from '../utils/helpers/axios';

export const createPaymentMethod = (data, id) => {
  return axios.post(`/stripe/create-payment-method/${id}`, data);
};

// export const createCustomer = data => {
//   console.log(data);
//   return axios.post('/stripe/create-customer', data);
// };

export const getCustomer = id => {
  return axios.get(`/stripe/customers/${id}`);
};

export const payForService = (id, data) => {
  return axios.post(`/stripe/pay-for-service/${id}`, data);
};
