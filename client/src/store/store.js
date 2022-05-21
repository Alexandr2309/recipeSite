import { configureStore } from '@reduxjs/toolkit';
import isUpdate from './slices/isUpdate';
import postReducer from './slices/posts'
const store = configureStore({
  reducer: {
    isUpdate: isUpdate,
    posts: postReducer,
  }
});

export default store