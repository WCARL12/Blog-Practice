const express = require('express')

const app = express()

app.listen(3000)

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
