const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/practic")

const plm = require('passport-local-mongoose')


const userschema = mongoose.Schema({

  username: String,
  password: String,
  email: String


})

// to use passport-local-mongoose
userschema.plugin(plm);


module.exports = mongoose.model("User", userschema)