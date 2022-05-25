import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const insertRecipe = recipe => api.post(`/recipe`, recipe);
export const getAllRecipes = () => api.get(`/recipes`);
export const updateRecipeById = (id, recipe) => api.put(`/recipe/${id}`, recipe);
export const deleteRecipeById = id => api.delete(`/recipe/${id}`);
export const getRecipeById = id => api.get(`/recipe/${id}`);
export const updateRecipeFavorite = (id, recipe) => api.put(`/recipe-favorite/${id}`, recipe);

export const getUser = (id) => api.get(`/recipe/get-user/${id}`);
export const updateUserFavorite = (user) => api.put(`/recipe/user/update-favorite`, user);
export const updateUserPosts = (user) => api.put(`/recipe/user/update-posts`, user);
export const createUser = (user) => api.post(`/recipe/user`, user);

const apis = {
  insertRecipe,
  getAllRecipes,
  updateRecipeById,
  deleteRecipeById,
  getRecipeById,
  updateRecipeFavorite,
  getUser,
  updateUserFavorite,
  updateUserPosts,
  createUser
};

export default apis;
