const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = process.env.PORT || 3000
const commentsRouter = require('./routes/comment.router')
const postsRouter = require('./routes/post.router')

// database connection
mongoose
  .connect(
    process.env.MONGODB_URL || 'mongodb://localhost:27017/retro-dashboard',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(err)
  })

// middleware
app.use(express.json())
app.use(postsRouter)
app.use(commentsRouter)

// server
app.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})
