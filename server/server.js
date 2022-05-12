const express = require('express');
// const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload')

const db = require('./db');
const recipeRouter = require('./route/recipe-router') 

const app = express();
const apiPort = 3000;

app.use('images/', express.static(path.join(__dirname, '/images')));
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error: '));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use('/api', recipeRouter);

app.listen(apiPort, () => console.log(`Server running at port ${apiPort}`));

