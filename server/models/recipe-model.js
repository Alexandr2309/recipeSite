const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Recipe = new Schema(
  {
    title: { type: String, required: true },
    anonce: { type: String, required: true },
    description: { type: String, required: true },
    ingredients: { type: Object, required: true },
    portions: { type: Number, required: true },
    sweets: { type: Boolean, required: true },
    author: { type: String, required: true },
    img: { type: String, required: true },
    tags: { type: Array, required: true },
    tookTime: { type: Number, required: true },
    spentTime: { type: Number, required: true },
  },
  { timestamps: true },
);

module.exports = mongoose.model('recipe', Recipe);