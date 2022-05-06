const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:12345@recipies.4gtwq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  dbName: 'Recipies',
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => err ? console.log(err) :
  console.log('Connected to yourDB-name database'));

const db = mongoose.connection
module.exports = db;