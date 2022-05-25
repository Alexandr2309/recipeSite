const Recipe = require('../models/recipe-model');
const UserPosts = require('../models/user-posts');
const fs = require('fs');
const config = require('../config/default.json');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: 'saha230904',
  api_key: '544956277398551',
  api_secret: 'Aj2QOdO7-Zb0iP2Xiz-IPuAz1UE'
});

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
    });
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
    cloudinary.uploader.destroy(recipe.img.match(/recipes\/.+(?=\.)/), function (result) { });
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
deleteImg = async (req, res) => {
  cloudinary.uploader.destroy(req.body.public_id, function (result) { });
}
createUser = async (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ success: false, error: 'Отправленны некорректные данные' })
  }

  const user = new UserPosts(body);

  if (!user) return res.status(400).json({ success: false, error: err });

  user
    .save()
    .then(result => {
      res.status(201).json({
        success: true,
        id: user.id,
        message: 'Пользователь успешно добавлен'
      })
    })
}
updateUserFavoritePosts = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Неверно указаны данные в рецепте для обновления'
    })
  }
  UserPosts.findOne({ id: body.id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        err,
        message: 'Рецепт не найден',
      })
    };
    user.favoritePosts = body.favoritePosts || Array;

    user.save()
      .then(() => {
        res.status(200).json({
          success: true,
          id: user.id,
          message: 'Избранные рецепты обновлены'
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
updateUserCreatedPosts = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'Неверно указаны данные в рецепте для обновления'
    })
  }
  UserPosts.findOne({ id: body.id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        err,
        message: 'Рецепт не найден',
      })
    };
    user.createdPosts = body.createdPosts|| Array;

    user.save()
      .then(() => {
        res.status(200).json({
          success: true,
          id: user.id,
          message: 'Избранные рецепты обновлены'
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
const getUser = async (req, res) => {
  await UserPosts.findOne({ id: req.params.id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!user) {
      return res.status(404).json({ success: false, error: 'Рецепт не найден' })
    };

    return res.status(200).json({ success: true, data: user })
  })
}
/*  Скачивание картинки, пока что не нужно
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
Выгрузка картинки, также не нужно
uploadRecipeImg = async (req, res) => {
  try {
    const file = req.files.file;
    await cloudinary.v2.uploader.upload(file, { public_id: file.name }, (err, res) => {
      console.log(err) || console.log(res);
    })
    const path = config.filePath + Date.now() + file.name;
    await fs.writeFile(path, file.data, err => err ? console.log(err) : 0);
    res.send(path)
  } catch (error) {
    return res.status(400).json({ success: false, error, message: error })
  }
}
*/
module.exports = {
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipes,
  getRecipeById,
  deleteImg,
  // getRecipeImg,
  // uploadRecipeImg,
  updateRecipeFavorite,
  createUser,
  updateUserFavoritePosts,
  updateUserCreatedPosts,
  getUser
}