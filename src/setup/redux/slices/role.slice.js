import {createSlice} from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    role: null,
    loading: false,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload.role;
    },
  },
});
export const {setRole} = roleSlice.actions;
export default roleSlice.reducer;

