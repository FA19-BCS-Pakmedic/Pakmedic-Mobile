import API from '../utils/helpers/axios';

export const chatWithBot = data => API.post('/chatbot/chat', data);
