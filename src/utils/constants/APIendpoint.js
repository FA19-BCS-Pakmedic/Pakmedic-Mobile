import {BASE_ADDRESS_DEV, BASE_URL, PORT} from '@env';

export const apiEndpoint = BASE_ADDRESS_DEV; //TODO: Replace this with link fetched from env vairable
export const baseUrl = `${BASE_URL}:${PORT}`;

console.log(apiEndpoint);
