const User = require('../models/user.model');

module.exports.requireAuth = (req,res,next) => {
  if(!req.signedCookies.userId) {
    res.status(403).send('User not authenticated')
    return;
  }

  var user = User.findById(req.signedCookies.userId);

  if(!user) {
    res.status(403).send('User not authenticated')
    return;
  }

  res.locals.user = user;

  next();
}