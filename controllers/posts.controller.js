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

async function updatePost(id, content) {
  const postUpdated = await Post.findByIdAndUpdate(id, content, { new: true })
  return postUpdated
}

async function deletePost(id) {
  const postDeleted = await Post.findByIdAndDelete(id)
  return postDeleted
}

module.exports = { getPosts, createPost, updatePost, deletePost }
