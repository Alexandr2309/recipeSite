const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user:12345@recipies.4gtwq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
  dbName: 'Recipies',
  useNewUrlParser: true,
  useUnifiedTopology: true
}, err => err ? console.log(err) :
  console.log('Connected to yourDB-name database'));

// Schema for users of app
const UserSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  anonce: {
    type: String,
    required: true,
  },
  ingredients: {
    type: String,
    required: true,
  },
  portions: {
    type: Number,
    required: true,
  },
  // tags: {
  //   type: Array,
  //   required: true,
  // },
  sweets: {
    type: Boolean,
    required: true,
  },
  author: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();

// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());
app.get("/", (req, resp) => {

  resp.send("App is Working");
  // You can check backend is working or not by 
  // entering http://loacalhost:5000

  // If you see App is working means
  // backend working properly
});

app.post("/register", async (req, resp) => {
  try {
    const user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    if (result) {
      delete result.password;
      resp.send(req.body);
      console.log(result);
    } else {
      console.log("User already register");
    }

  } catch (e) {
    resp.send("Something Went Wrong");
  }
});
app.listen(5000);