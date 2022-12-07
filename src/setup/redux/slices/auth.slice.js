import {createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false,
  },
  reducers: {
    authStart: (state, action) => {
      //   state.error = null;
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.loading = false;
    },
  },
});

export const {authStart, authSuccess} = authSlice.actions;
export default authSlice.reducer;
