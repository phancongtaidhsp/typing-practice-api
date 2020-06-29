var mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String
})

var User = mongoose.model('User', userSchema, 'users')

module.exports = User;