import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  progress: 0,
  answers: [],
};
const evaluationSlice = createSlice({
  name: 'evaluation',
  initialState,
  reducers: {
    setProgress(state, action) {
      state.progress = action.payload;
    },
    setAnswers(state, action) {
      state.answers = action.payload;
    },
    reset(state) {
      state.progress = 0;
      state.answers = [];
    },
  },
});
export const { setProgress, setAnswers, reset } = evaluationSlice.actions;
export default evaluationSlice.reducer; 