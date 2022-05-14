const express = require('express');
const RecipeCtrl = require('../controllers/recipe-ctrl');
const router = express.Router();

router.get('/recipe/:id', RecipeCtrl.getRecipeById)
router.get('/recipes', RecipeCtrl.getRecipes);
router.get('/recipe-download', RecipeCtrl.getRecipeImg)
router.post('/recipe', RecipeCtrl.createRecipe)
router.post('/recipe-img', RecipeCtrl.uploadRecipeImg)
router.put('/recipe/:id', RecipeCtrl.updateRecipe)
router.put('/recipe-favorite/:id', RecipeCtrl.updateRecipeFavorite)
router.delete('/recipe/:id', RecipeCtrl.deleteRecipe)
module.exports = router