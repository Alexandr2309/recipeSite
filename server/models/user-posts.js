const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserPosts = new Schema({
  id: { type: String, required: true },
  email: { type: String, required: true },
  createdPosts: { type: Array, required: false, default: [] },
  favoritePosts: { type: Array, required: false, default: [] }
});

module.exports = mongoose.model('userPosts', UserPosts);