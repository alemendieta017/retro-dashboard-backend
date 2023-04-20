const router = require('express').Router()

router.get('/posts', async (req, res) => {
  const category = req.query.category
  const response = await controller.getPosts(category)
  res.send(response)
})

router.post('/createPost', async (req, res) => {
  const content = req.body
  const response = await controller.createPost(content)
  res.send(response)
})

module.exports = router
