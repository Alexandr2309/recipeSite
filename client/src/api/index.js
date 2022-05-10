import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const insertRecipe = recipe => api.post(`/recipe`, recipe);
// export const insertRecipeImg = image => api.post(`/recipe-img`, image, {
//   headers: {
//     'content-type': 'multipart/form-data'
//   }
// });
export const getAllRecipes = () => api.get(`/recipes`);
export const updateRecipeById = (id, recipe) => api.put(`/recipe/${id}`, recipe);
export const deleteRecipeById = id => api.delete(`/recipe/${id}`);
export const getRecipeById = id => api.get(`/recipe/${id}`);

const apis = {
  insertRecipe,
  // insertRecipeImg,
  getAllRecipes,
  updateRecipeById,
  deleteRecipeById,
  getRecipeById,
};

export default apis;
