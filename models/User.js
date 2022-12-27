const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = new Schema(
  {
    UserName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    foldername: { type: String, default: "" },
    password: { type: String, default: "", require: true },
    folderId: { type: String, default: "" },
    key: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "User",
  }
);

module.exports = mongoose.model("User", User);
