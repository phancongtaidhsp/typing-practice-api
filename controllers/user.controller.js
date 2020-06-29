const User = require('../models/user.model');

module.exports.get = (req, res) => {
  var id = req.signedCookies.userId
  User.findById(id, function (err, user) {
    if(user) res.status(200).send(user)
    else res.status(400).send('Failed with invalid input parameter')
  });
}

module.exports.update = async (req, res) => {
  User.findById(req.signedCookies.userId, function (err, doc) {
    if (err){
      res.status(500).send('Failed with internal server error')
    }
    else if(!doc) res.status(400).send('Failed with invalid input parameter')
    doc.password = req.body.password ? req.body.password : doc.password;
    doc.email = req.body.email ? req.body.email : doc.email;
    doc.save(() => res.status(200).send('Update Profile Successful'));
  });
}
