import { configureStore } from '@reduxjs/toolkit';
import isUpdate from './slices/isUpdate';
import postReducer from './slices/posts'
import userSlice from './slices/userSlice';
const store = configureStore({
  reducer: {
    isUpdate: isUpdate,
    posts: postReducer,
    user: userSlice
  }
});

export default store