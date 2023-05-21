import API from '../utils/helpers/axios';


//get file from the backend
export const getFile = filename => {
  return API.get(`/files/${filename}`);
};

//add file to the backend
export const addFile = data => {
  return API.post(`/files/`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress,
  });
};

const onUploadProgress = progressEvent => {
  const {loaded, total} = progressEvent;
  let percent = Math.floor((loaded * 100) / total);
  if (percent < 100) {
    console.log(`${loaded} bytes of ${total} bytes. ${percent}%`);
  }
};
