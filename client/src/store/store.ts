
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slice/userSlice';
import examReducer from '../slice/examSlice';
import questionReducer from '../slice/questionSlice';

export const store = configureStore({
  reducer: {
    "user": userReducer,
    "exam": examReducer,
    "question": questionReducer,
  },

});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;