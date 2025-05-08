const mongoose = require("mongoose");
// Use environment variable for MongoDB connection or fallback to local for development
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/practic";
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const plm = require('passport-local-mongoose')


const userschema = mongoose.Schema({

  username: String,
  password: String,
  email: String


})

// to use passport-local-mongoose
userschema.plugin(plm);


module.exports = mongoose.model("User", userschema)