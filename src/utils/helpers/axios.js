import axios from 'axios';

//import api end point
import {apiEndpoint} from '@/utils/constants/APIendpoint';

const instance = axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});

// // interceptor to logout patient and redirect them to login page when token expires
// // Path: Pakmedic-Mobile\src\utils\helpers\axios.js
// import axios from 'axios';
// import {store} from '@/store';
// import {logout} from '@/utils/helpers/auth';

// //import api end point
// import {apiEndpoint} from '@/utils/constants/APIendpoint';

// const instance = axios.create({
//   baseURL: `${apiEndpoint}`,
//   withCredentials: true,
// });

// import {authLogout} from '@/store/actions/auth';
// import {deviceStorage} from '@/utils/helpers/deviceStorage';
// import ';
// import {dispatch} from '';


// const logout = async () => {
//   await deviceStorage.deleteItem('jwtToken');
//   await voximplant.disconnect();
//   dispatch(authLogout());
//   navigation.replace('Auth', {
//     screen: 'Login',
//   });
// };


// instance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   error => {
//     if (error.response.status === 401) {
//       logout();
//     }
//     return Promise.reject(error);
//   },
// );

export default instance;
