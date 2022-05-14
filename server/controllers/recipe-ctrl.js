const Recipe = require('../models/recipe-model');
const fs = require('fs');
const config = require('../config/default.json');

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
    .then((result) => {
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
    recipe.ingredients = body.ingredients;
    recipe.portions = body.portions;
    recipe.sweets = body.sweets;
    recipe.author = body.author;
    recipe.img = body.img ? body.img : recipe.img;
    recipe.tags = body.tags
    recipe.tookTime = body.tookTime
    recipe.spentTime = body.spentTime

    recipe.save()
      .then(() => {
        res.status(200).json({
          success: true,
          id: recipe._id,
          message: 'Рецепт обновлён'
        })
      })
      .catch(err => {
        res.status(404).json({
          err,
          message: 'Рецепт не обновлён, произошла ошибка, попробуйте позже'
        })
      })
  })
}
updateRecipeFavorite = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Неверно указаны данные в рецепте для обновления'
    })
  }
  Recipe.findOne({ _id: req.params.id }).exec((err, recipe) => {
    if (err) {
      return res.status(400).json({
        err,
        message: 'Рецепт не найден',
      })
    };
    recipe.favorite = body.favorite;

    recipe.save()
      .then(() => {
        res.status(200).json({
          success: true,
          id: recipe._id,
          message: 'Рецепт обновлён'
        })
      })
      .catch(err => {
        res.status(404).json({
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
    };
    console.log(recipe.img)
    fs.unlinkSync(recipe.img, err => {
      if (err) return res.status(404).json({ err, message: 'Не удалось удалить изображение' });
      console.log('Файл успешно удалён')
    });
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
    return res.status(200).json({ success: true, data: recipes })
  })
}
getRecipeById = async (req, res) => {
  await Recipe.findOne({ _id: req.params.id }).exec((err, recipe) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!recipe) {
      return res.status(404).json({ success: false, error: 'Рецепт не найден' })
    };

    return res.status(200).json({ success: true, data: recipe })
  })
}
getRecipeImg = async (req, res) => {
  try {
    const path = req.query.path;
    if (fs.existsSync(path)) {
      return res.download(path, path.name);
    }
    return res.status(400).json({ message: 'Download error' })
  } catch (error) {
    return res.status(404).json({ success: false, error: error })
  }
}
uploadRecipeImg = async (req, res) => {
  try {
    const file = req.files.file;
    const path = config.filePath + Date.now() + file.name;
    await fs.writeFile(path, file.data, err => err ? console.log(err) : 0);
    res.send(path)
  } catch (error) {
    return res.status(400).json({ success: false, error })
  }
}
module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  getRecipeById,
  getRecipeImg,
  uploadRecipeImg,
  updateRecipeFavorite
}