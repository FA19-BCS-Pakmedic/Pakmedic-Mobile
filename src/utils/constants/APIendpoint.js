import {BASE_ADDRESS_DEV, BASE_URL, PORT} from '@env';

// export const apiEndpoint = BASE_ADDRESS_DEV; //TODO: Replace this with link fetched from env vairable
// export const baseUrl = `${BASE_URL}:${PORT}`;

export const apiEndpoint = 'http://192.168.0.101:8000/api/v1/';
export const baseUrl = `http://192.168.0.101:8000`;

console.log(baseUrl);

console.log(apiEndpoint);
