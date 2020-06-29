const shortid = require('shortid');
const md5 = require('md5');
const User = require('../models/user.model');

module.exports.login = (req,res) => res.render('auth/login')

module.exports.postLogin = async (req,res) => {
  var username = req.body.username;
  var password = req.body.password;

  password = password ? md5(password) : ''
  
  var user = await User.findOne({ username: username, password: password }).catch( err => {
    res.status(500).send('Failed with internal server error')
  });
  if(!user){
    res.status(400).send('Invalid log-in id/password supplied')
    return;
  }
  res.cookie('userId',user.id, { signed: true })
  res.status(200).send(username)
}

module.exports.logout = async (req, res) => {
  res.clearCookie('userId');
  res.status(200).send('Successful log-out')
}

module.exports.create = (req, res) => {
  res.render('users/create')
}

module.exports.postCreate = async (req, res) => {
  req.body.id = shortid.generate();
  req.body.password = md5(req.body.password);
  await User.create(req.body).catch(err => {
    res.status(500).send('Failed with internal server error')
  })
  res.status(200).send(req.body)
}