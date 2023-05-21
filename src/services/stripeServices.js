import API from '../utils/helpers/axios';

export const createPaymentMethod = data => {
  return axios.post('/stripe/create-payment-method', data);
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
}
