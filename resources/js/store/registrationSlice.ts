import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  step: 1,
  data: {},
};
const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep(state, action) {
      state.step = action.payload;
    },
    setData(state, action) {
      state.data = { ...state.data, ...action.payload };
    },
    reset(state) {
      state.step = 1;
      state.data = {};
    },
  },
});
export const { setStep, setData, reset } = registrationSlice.actions;
export default registrationSlice.reducer; 