const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

const dbURI = 'mongodb+srv://CarlW12:CWmDB9082@nodetuts.6c0fesw.mongodb.net/abbatek-database?retryWrites=true&w=majority&appName=nodetuts'

mongoose.connect(dbURI)
.then(result => app.listen(3000))
.catch(err => {
  console.log('Could not connect to MongoDB', err);
})

app.use(express.static('public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
  const blogs = [
    {
      blogTitle: 'How To Create UX Design With Adobe XD',
      blogSnippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero harum placeat facilis nostrum doloremque omnis officiis eos? Iure deserunt, neque perferendis eaque eveniet'
    },
    {
      blogTitle: 'Another Blog Title',
      blogSnippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero harum placeat facilis nostrum doloremque omnis officiis eos? Iure deserunt, neque perferendis eaque eveniet'
    },
    {
      blogTitle: 'Yet Another Blog Title',
      blogSnippet: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero harum placeat facilis nostrum doloremque omnis officiis eos? Iure deserunt, neque perferendis eaque eveniet'
    }
  ]
  res.render('index', { title: 'Home', navInfo: 'Welcome to Abbatek Blogs!', blogs })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create', navInfo: 'Create a Blog!' })
})
