const Lesson = require('../models/lesson.model');

module.exports.index = (req, res) => {
  Lesson.find().then(lessons => {
    res.status(200).send(lessons);
  },error => {
    res.status(500).send(error);
  })
}

module.exports.postCreate = async (req, res) => {
  await Lesson.create(req.body).catch(err => {
    res.status(500).send('Failed with internal server error')
    return
  })
  res.status(200).send(req.body)
}

module.exports.delete = async (req, res) => {
  var id = req.params.id
  const re = await Lesson.remove({ _id: id }).catch(err => {
    res.status(500).send('Failed with internal server error')
  });
  re.deletedCount; // Number of documents removed
  res.status(204).send('successful operation')
}

module.exports.update = async (req, res) => {
  var id = req.params.id
  Lesson.findById(id, function (err, doc) {
    if (err){
      res.status(500).send('Failed with internal server error')
    }
    else if(!doc) res.status(400).send('Failed with invalid input parameter')
    doc.name = req.body.name ? req.body.name : doc.name;
    doc.content = req.body.content ? req.body.content : doc.content;
    doc.level = req.body.level ? req.body.level : doc.level;
    doc.save(() => res.status(200).send('Update Lesson Successful'));
  });
}