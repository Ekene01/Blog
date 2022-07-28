const express = require('express')
const app = new express()
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true })
const BlogPost = require('./models/BlogPost.js')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', async(req, res) => {
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'))
    res.render('about');
})
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'))
    res.render('contact');
})

app.get('/posts/search', async (req, res) => {
    const search = await BlogPost.find(req.params.body)
    res.render('index', {
        search
    });
})

app.get('/post/:id', async(req, res) => {
    const blogpost = await BlogPost.findById(req.params.id) 
    res.render('post', {
        blogpost
    })
})
app.get('/posts/new', (req,res) => {
    res.render('create')
})
app.post('/posts/store', async(req, res) => {
    //console.log(req.body)
    //Model creates new doc with browser data
    await BlogPost.create(req.body)
        res.redirect('/')
    })

