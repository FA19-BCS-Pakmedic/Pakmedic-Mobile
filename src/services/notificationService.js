import API from '@/utils/helpers/axios';

//add a scan
export const register = async data => {
  return API.post(`notifications/register`, data);
};

export const update = async data => {
  return API.post(`notifications/update?userid=${data?.userId}`, {
    tokenID: data?.token,
  });
};
