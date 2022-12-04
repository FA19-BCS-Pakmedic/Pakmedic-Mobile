import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    // userId: null,
    // error: null,
    loading: false,
    authRedirectPath: '/',
  },
  reducers: {
    authStart: (state, action) => {
      //   state.error = null;
      state.loading = true;
    },
    authSuccess: (state, action) => {
      state.token = action.payload.token;
      // state.userId = action.payload.userId;
      //   state.error = null;
      state.loading = false;
    },
  },
});

export const {authStart, authSuccess} = authSlice.actions;
export default authSlice.reducer;
