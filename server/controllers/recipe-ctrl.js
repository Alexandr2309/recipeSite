const Recipe = require('../models/recipe-model');

createRecipe = (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Неверно указаны данные в рецепте'
    })
  };

  const recipe = new Recipe(body);

  if (!recipe) {
    return res.status(400).json({ success: false, error: err })
  };

  recipe
    .save()
    .then(() => {
      res.status(201).json({
        success: true,
        id: recipe._id,
        message: 'Recipe created!',
      })
    })
};

updateRecipe = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Неверно указаны данные в рецепте для обновления'
    })
  };

  Recipe.findOne({ _id: req.params.id }).exec((err, recipe) => {
    if (err) {
      return res.status(400).json({
        err,
        message: 'Рецепт не найден',
      });
    };
    recipe.title = body.title;
    recipe.anonce = body.anonce;
    recipe.description = body.description;
    recipe.ingridients = body.ingridients;
    recipe.portions = body.portions;
    recipe.sweets = body.sweets;
    recipe.author = body.author;

    recipe.save()
      .then(() => {
        res.status(200).json({
          success: true,
          id: recipe._id,
          message: 'Рецепт обновлён'
        })
      })
      .catch(err => {
        res.staus(404).json({
          err,
          message: 'Рецепт не обновлён, произошла ошибка, попробуйте позже'
        })
      })
  })
}
deleteRecipe = async (req, res) => {
  await Recipe.findOneAndDelete({ _id: req.params.id }).exec((err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    };
    if (!recipe) {
      return res.status(404).json({ success: false, message: 'Рецепт не найден' })
    }
    return res.status(200).json({ success: true, data: recipe })
  })
}

getRecipes = async (req, res) => {
  await Recipe.find({}).exec((err, recipes) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!recipes.length) {
      return res.status(404).json({
        success: false,
        error: 'Рецепты не найдены'
      })
    };
    return res.status(200).json({success: true, data: recipes})
  })
}

getRecipeById = async (req, res) => {
  await Recipe.findOne({_id: req.params.id}).exec((err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Рецепт не найден' })
    }
    return res.status(200).json({ success: true, data: recipe })
  })
}

module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  getRecipeById,
}