const User = require('../models/user.model');

module.exports.validateUserInput = async (req, res, next) => {
  var errors = [];
  if(!req.body.username){
      errors.push('Name is required.');
  }
  if(!req.body.password){
      errors.push('Phone is required.');
  }
  if(errors.length) {
    res.status(400).send(errors)
    return;
  }
  next();
}

module.exports.postCreate = async function(req, res, next){
  var isUserExisted = await User.exists({ username: req.body.username })

  if(isUserExisted){
    res.status(406).send('Username is existed.')
    return
  }
  next();
}