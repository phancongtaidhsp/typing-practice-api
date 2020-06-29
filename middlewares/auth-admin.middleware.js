const User = require('../models/user.model');

module.exports.requireAuthAdmin = async (req,res,next) => {

  await User.findById(req.signedCookies.userId, function (err, user) {
    if(user){
      console.log(user.role)
      if(user.role === 'admin') next();
      else res.status(403).send('Unauthorized, admin log-in is required')
    }
    else res.status(500).send('Failed with internal server error')
  });
}