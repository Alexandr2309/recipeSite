const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload')

function filePath(path) {
  return function (req, res, next) {
    req.filePath = path;
    next();
  }
}

const db = require('./db');
const recipeRouter = require('./route/recipe-router')

const app = express();
let apiPort = process.env.PORT || 3000;

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(filePath(path.resolve(__dirname, 'images')))

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.use('/api', recipeRouter);

app.listen(process.env.PORT || 3000, () => console.log(`Server running at port ${apiPort}`));

