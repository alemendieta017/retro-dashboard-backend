const Comment = require('../models/comment')

async function getComments(postId) {
  const comments = await Comment.find({ postId })
  return comments
}

async function createComment(content) {
  const newComment = await Comment.create(content)
  return newComment
}

module.exports = { getComments, createComment }
