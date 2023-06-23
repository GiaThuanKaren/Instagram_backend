const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = new Schema({
  content: {
    type: String,
    required: true
  },
  parentCommentID: {
    type: String,
    default: ""
  },
  postId: {
    type: String,
    require: true
  },
  authorId: {
    type: mongoose.Types.ObjectId,
    require: true,

  },
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }]
});



module.exports = mongoose.model("Comment", Comment);
