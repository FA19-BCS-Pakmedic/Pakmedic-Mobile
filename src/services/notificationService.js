import API from '@/utils/helpers/axios';

//add a scan
export const register = async data => {
  return API.post(`notifications/`, data);
};

export const update = async data => {
  return API.patch(`notifications/?userid=${data?.userId}`, {
    tokenID: data?.token,
  });
};
