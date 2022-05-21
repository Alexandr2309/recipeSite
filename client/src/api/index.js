import axios from 'axios';
const apiPort = process.env.PORT || 3000;

const api = axios.create({
  baseURL: `https://lit-taiga-18944.herokuapp.com/api`,
});

export const insertRecipe = recipe => api.post(`/recipe`, recipe);
export const getAllRecipes = () => api.get(`/recipes`);
export const updateRecipeById = (id, recipe) => api.put(`/recipe/${id}`, recipe);
export const deleteRecipeById = id => api.delete(`/recipe/${id}`);
export const getRecipeById = id => api.get(`/recipe/${id}`);
export const updateRecipeFavorite = (id, recipe) => api.put(`/recipe-favorite/${id}`, recipe);

const apis = {
  insertRecipe,
  getAllRecipes,
  updateRecipeById,
  deleteRecipeById,
  getRecipeById,
  updateRecipeFavorite
};

export default apis;
