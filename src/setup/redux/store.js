import {configureStore} from '@reduxjs/toolkit';

//import reducers
import authReducer from './slices/auth.slice';
import loadingReducer from './slices/loading.slice';
import roleReducer from './slices/role.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    loading: loadingReducer,

  },
});
