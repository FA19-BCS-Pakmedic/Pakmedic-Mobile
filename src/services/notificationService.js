import API from '@/utils/helpers/axios';

//add a scan
export const register = async data => {
  console.log(data);
  return API.post(`notifications/register`, {token: data});
};
