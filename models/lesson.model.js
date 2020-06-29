var mongoose = require('mongoose')

var lessonSchema = new mongoose.Schema({
  name: String,
  content: String,
  level: Number,
})

var Lesson = mongoose.model('Lesson', lessonSchema, 'lessons')

module.exports = Lesson;