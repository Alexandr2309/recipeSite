import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api';

const initialState = {
  posts: [],
  nowPosts: []
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (obj = 0, { rejectWithValue, dispatch }) => {
    try {
      await api.getAllRecipes().then(recipes => {
        dispatch(setPosts(recipes.data.data));
        dispatch(updateNowPosts(recipes.data.data));
      });
    } catch(err) {
      console.log(err)
    }
  }
)

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPosts: (state, action) => {
      state.posts.push(action.payload);
    },
    updateNowPosts: (state, action) => {
      state.nowPosts = action.payload;
    },
    removePost: (state, action) => {

    }
  }
});
export const { setPosts, addPosts, updateNowPosts, deletePost } = postSlice.actions;
export default postSlice.reducer;