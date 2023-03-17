import axios from 'axios';

//import api end point
import {apiEndpoint} from '@/utils/constants/APIendpoint';

export default axios.create({
  baseURL: `${apiEndpoint}`,
  withCredentials: true,
});
