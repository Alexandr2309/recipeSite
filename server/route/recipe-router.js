const express = require('express');
const fileMiddleWare = require('../middleware/file');
const RecipeCtrl = require('../controllers/recipe-ctrl');
const router = express.Router();

router.post('/recipe', RecipeCtrl.createRecipe)
router.post('/recipe-img', RecipeCtrl.uploadRecipeImg)
router.put('/recipe/:id', RecipeCtrl.updateRecipe)
router.delete('/recipe/:id', RecipeCtrl.deleteRecipe)
router.get('/recipe/:id', RecipeCtrl.getRecipeById)
router.get('/recipes', RecipeCtrl.getRecipes);
router.get('/recipe-download', RecipeCtrl.getRecipeImg) 
module.exports = router