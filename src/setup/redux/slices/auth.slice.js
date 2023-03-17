import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
  },
  reducers: {
    authSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },

    authLogout: state => {
      state.token = null;
      state.user = null;
    },

    authUpdate: (state, action) => {
      state.user = action.payload.user;
    },
  },
});

export const {authLogout, authSuccess, authUpdate} = authSlice.actions;
export default authSlice.reducer;
