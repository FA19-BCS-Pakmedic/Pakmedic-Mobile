import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false,
  },
  reducers: {
    authSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    authFail: state => {
      state.token = null;
      state.user = null;
    },
  },
});

export const {authFail, authSuccess} = authSlice.actions;
export default authSlice.reducer;
