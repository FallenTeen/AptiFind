import { configureStore } from '@reduxjs/toolkit';
import registrationReducer from './registrationSlice';
import evaluationReducer from './evaluationSlice';
import { api } from './api';

export const store = configureStore({
  reducer: {
    registration: registrationReducer,
    evaluation: evaluationReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 