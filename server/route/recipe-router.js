const express = require('express');
const RecipeCtrl = require('../controllers/recipe-ctrl');
const router = express.Router();

router.get('/recipe/:id', RecipeCtrl.getRecipeById)
router.get('/recipes', RecipeCtrl.getRecipes);
router.post('/recipe', RecipeCtrl.createRecipe)
router.post('/recipe-delete_img', RecipeCtrl.deleteImg)
router.put('/recipe/:id', RecipeCtrl.updateRecipe)
router.put('/recipe-favorite/:id', RecipeCtrl.updateRecipeFavorite)
router.delete('/recipe/:id', RecipeCtrl.deleteRecipe)
router.post('/recipe/user', RecipeCtrl.createUser)
router.put('/recipe/user/update-favorite', RecipeCtrl.updateUserFavoritePosts)
router.put('/recipe/user/update-posts', RecipeCtrl.updateUserCreatedPosts)
router.get('/recipe/get-user/:id', RecipeCtrl.getUser)
module.exports = router