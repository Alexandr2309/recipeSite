import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apis from './../../api/index';

const initialState = {
  email: null,
  name: null,
  surname: null,
  avatar: "https://res.cloudinary.com/saha230904/image/upload/v1653376961/recipes/defaultAva_kzfibd.png",
  id: null,
  token: null,
  createdPosts: [],
  favoritePosts: []
};

export const getUserPosts = createAsyncThunk(
  'user/getUserPosts',
  async (id, { rejectWithValue, dispatch }) => {
    await apis.getUser(id).then(result => {
      dispatch(setPosts(result.data.data.createdPosts));
      dispatch(setFavorite(result.data.data.favoritePosts))
    })
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, name, surname, id, token } = action.payload;
      state.email = email;
      state.name = name;
      state.surname = surname;
      state.id = id;
      state.token = token
    },
    removeUser: (state, action) => {
      state.email = state.name = state.surname = state.id = state.token = null;
    },
    setPosts: (state, action) => {
      state.createdPosts = action.payload;
    },
    setFavorite: (state, action) => {
      state.favoritePosts = action.payload;
    },
    updateFavorite: (state, action) => {
      state.favoritePosts.push(action.payload);
      apis.updateUserFavorite(state);
    },
    updatePosts: (state, action) => {
      state.createdPosts.push(action.payload);
      apis.updateUserPosts(state)
    },
    removeFavorite: (state, action) => {
      state.favoritePosts = state.favoritePosts.filter(fav => fav !== action.payload);
      apis.updateUserFavorite(state);
    },
    removeCreatedPost: (state, action) => {
      state.createdPosts = state.createdPosts.filter(create => create !== action.payload);
      apis.updateUserPosts(state);
    },
  }
});

export const { setUser, removeUser, setPosts, setFavorite, updateFavorite, updatePosts, removeFavorite, removeCreatedPost } = userSlice.actions;
export default userSlice.reducer;