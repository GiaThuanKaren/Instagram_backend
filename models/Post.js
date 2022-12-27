const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema(
  {
    title: { type: String, default: "default title" },
    descripttion: { type: String, default: "Default Desciiption" },
  },
  {
    timestamps: true,
  }
);
