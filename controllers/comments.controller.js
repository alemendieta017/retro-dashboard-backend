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
  )

  return { newComment, post } // return both the new comment and the post
}

module.exports = { getComments, createComment }
