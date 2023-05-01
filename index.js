const express = require('express')
const mongoose = require('mongoose')
const app = express()
const server = require('http').createServer(app)
const socketIo = require('socket.io')
const cors = require('cors')
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

//cors
app.use(cors())

// middleware
app.use(express.json())
app.use(postsRouter)
app.use(commentsRouter)

// error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Algo salio mal!')
})

// socket.io

const io = socketIo(server, {
  cors: {
    origin: '*',
  },
})

io.on('connection', (socket) => {
  console.log('a user connected ' + socket.id, new Date()) // socket.id is unique for each connection
})

app.set('io', io)

// server
server.listen(PORT, () => {
  console.log('Server is running on port ' + PORT)
})
