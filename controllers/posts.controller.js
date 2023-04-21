const Post = require('../models/post')

async function getPosts(category) {
  const options = category ? { category } : {}
  const posts = await Post.find(options).populate('comments').exec()

  const response = {
    totalPosts: posts.length,
    posts,
  }

  return response
}

async function createPost(content) {
  const newPost = await Post.create(content)
  return newPost
}

module.exports = { getPosts, createPost }
