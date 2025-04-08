"use strict";

var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  }
});
var User = mongoose.model("User ", UserSchema);
module.exports = User;