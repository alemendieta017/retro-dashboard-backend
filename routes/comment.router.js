const router = require('express').Router()
const controller = require('../controllers/comments.controller')

router.get('/comments', async (req, res) => {
  const postId = req.query.postId
  const response = await controller.getComments(postId)
  res.send(response)
})

router.post('/createComment', async (req, res) => {
  const content = req.body
  const response = await controller.createComment(content)
  res.send(response)
})

module.exports = router
