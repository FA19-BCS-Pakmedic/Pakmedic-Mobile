import {createSlice} from '@reduxjs/toolkit';

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    role: null,
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});
export const {setRole} = roleSlice.actions;
export default roleSlice.reducer;
