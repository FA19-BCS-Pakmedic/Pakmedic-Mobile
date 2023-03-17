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

//add a report
export const addReport = async data => {
  return API.post(`reports`, data);
};

// update a report
export const updateReport = async (id, data) => {
  console.log(id, data);

  return API.patch(`reports/${id}`, data);
};

// delete a report
export const deleteReport = async id => {
  return API.delete(`reports/${id}`);
};
