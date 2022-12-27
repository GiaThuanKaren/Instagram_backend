const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema({
  UserName: { type: String, require: true },
  email: { type: String, require: true, unique: true },
  foldername: { type: String, default: "" },
  password: { type: String, default: "", require: true },
  folderId: { type: String, default: "" },
});

module.exports = mongoose.model("User", User);
