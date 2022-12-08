import {createSlice} from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    loading: false,
    buttonLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setButtonLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {setLoading, setButtonLoading} = loadingSlice.actions;
export default loadingSlice.reducer;
