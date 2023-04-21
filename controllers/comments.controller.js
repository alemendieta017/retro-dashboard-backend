const Comment = require('../models/comment')
const Post = require('../models/post')

async function getComments(postId) {
  const comments = await Comment.find({ postId })
  return comments
}

async function createComment(postId, content) {
  const newComment = await Comment.create({ content, postId })
  const post = await Post.findByIdAndUpdate(
    postId,
    { $push: { comments: newComment._id } },
    { new: true }
  ).populate('comments')

  return post
}

async function deleteComment(id) {
  const commentDeleted = await Comment.findByIdAndDelete(id)
  return commentDeleted
}

async function updateComment(id, content) {
  const updatedComment = await Comment.findByIdAndUpdate(id, content, {
    new: true,
  })
  return updatedComment
}

module.exports = { getComments, createComment, deleteComment, updateComment }
