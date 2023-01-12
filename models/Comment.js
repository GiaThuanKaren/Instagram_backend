const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Comment = new Schema({
  parentId: { type: String, default: "" },
  subparentId: { type: String, default: "" },
  //   Reply: { type: Array, default: [] },
  authorComment: { type: String, default: "" },
  IdPost: { type: String },
  TotalReply: { type: number, default: 0 },
});

module.exports = mongoose.model("Comment", Comment);
