const express = require('express')
// const morgan = require('morgan')
const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')
const Blog = require('./models/blog')

const app = express()

const dbURI = 'mongodb+srv://CarlW12:CWmDB9082@nodetuts.6c0fesw.mongodb.net/abbatek-database?retryWrites=true&w=majority&appName=nodetuts'

mongoose.connect(dbURI)
.then(result => app.listen(3000))
.catch(err => {
  console.log('Could not connect to MongoDB', err);
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/img'); // Save files in public/img directory
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({ storage: storage });

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({extended : true}))

app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/blogs', (req, res) => {
  Blog.find().sort({createdAt : -1})
  .then((result) => {
    res.render('index', { title: 'Home', navInfo: 'Welcome to Abbatek Blogs!', blogs : result })
  })
  .catch(err => {
    console.log(err);
  })


})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create', navInfo: 'Create a Blog!' })
})

// app.post('/blogs', (req, res) => {
//   const blog = new Blog(req.body)
//   console.log(blog);
//   blog.save()
//   .then((result) => {
//   res.redirect('/blogs')
//   })
//   .catch((err) => {
//     console.log(err);
//   })
// })

app.post('/blogs', upload.single('imageURL'), (req, res) => {
  const { title, snippet, body } = req.body;
  const imageURL = req.file ? `/img/${req.file.filename}` : null;

  const blog = new Blog({ title, snippet, body, imageURL });

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    });
});