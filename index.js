require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose')

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})

const userRoutes = require('./routes/user.route')
const authRoutes = require('./routes/auth.route')
const lessonRoutes = require('./routes/lesson.route')

const authUserMiddleware = require('./middlewares/auth-user.middleware')

const port = 3000
const app = express()

app.set('view engine', 'pug')
app.set('views', './views')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SESSION_SECRET))

app.use(express.static('public'))

app.get('/', (req, res) => res.render('index',{
    name: 'Phan Cong Tai'
}))

app.use('/auth', authRoutes);

app.use('/users', authUserMiddleware.requireAuth, userRoutes);

app.use('/lessons', lessonRoutes);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))