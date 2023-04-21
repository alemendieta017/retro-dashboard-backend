const router = require('express').Router()
const controller = require('../controllers/comments.controller')

router.get('/comments', async (req, res) => {
  const postId = req.query.postId
  const response = await controller.getComments(postId)
  res.send(response)
})

router.post('/createComment', async (req, res) => {
  const postId = req.body.postId
  const content = req.body.content
  const response = await controller.createComment(postId, content)
  res.send(response)
})

module.exports = router
