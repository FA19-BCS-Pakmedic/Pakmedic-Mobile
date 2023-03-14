import API from '@/utils/helpers/axios';

//add a scan
export const addScan = async data => {
  return API.post(`scans`, data);
};

// update a scan
export const updateScan = async (id, data) => {
  return API.patch(`scans/${id}`, data);
};

// delete a scan
export const deleteScan = async id => {
  return API.delete(`scans/${id}`);
};
