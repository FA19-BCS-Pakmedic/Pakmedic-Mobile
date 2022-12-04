import {configureStore} from '@reduxjs/toolkit';

//import reducers
import authReducer from './slices/message.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
