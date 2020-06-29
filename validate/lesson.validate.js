const Lesson = require('../models/lesson.model');

module.exports.validateLessonInput = async (req, res, next) => {
  var errors = [];
  if(!req.body.name){
      errors.push('Name is required.');
  }
  if(!req.body.content){
      errors.push('Content is required.');
  }
  if(!req.body.level){
    errors.push('Level is required.');
}
  if(errors.length) {
    res.status(400).send('Failed with incorrect one time password')
    return;
  }
  next();
}

module.exports.postCreate = async function(req, res, next){
  var isLessonExisted = await Lesson.exists({ name: req.body.name }).catch(err => {
    res.status(500).send('Failed with internal server error')
  })

  if(isLessonExisted){
    res.status(406).send('The lessons is already.')
    return
  }

  next();
}