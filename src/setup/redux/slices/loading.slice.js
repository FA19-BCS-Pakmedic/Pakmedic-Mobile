import {createSlice} from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      console.log(action);
      state.loading = action.payload;
    },
  },
});

export const {setLoading} = loadingSlice.actions;
export default loadingSlice.reducer;
