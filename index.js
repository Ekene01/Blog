const express = require('express')
const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
const { validate } = require('./models/BlogPost.js')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const homeController = require('./controllers/storePost')
const homeController = require('./controllers/getPost')
const validateMiddleWare = require('./middleware/validationMiddleware')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/')

app.use(bodyParser.json())
app.use(fileUpload())
app.use(bodyParser.urlencoded({extended:true}))
app.use('/posts/store', validateMiddleWare)
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', homeController)
app.get('/post/:id', getPostController)
app.post('/posts/store', storePostController)
app.get('/auth/register', newUserController)
app.get('/posts/new', newPostController)


app.get('/posts/search', async (req, res) => {
    const search = await BlogPost.find(req.params.body)
    res.render('index', {
        search
    });
})





