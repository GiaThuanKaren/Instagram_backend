const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Post = new Schema(
  {
    title: { type: String, default: "default title" },
    descripttion: { type: String, default: "Default Desciiption" },
    media: { type: Array, default: [] },
    reaction:{
      type:Array,              
    },
    authorid:{
      type : mongoose.Types.ObjectId,
      ref:"User"
    }
  },
  {
    timestamps: true,
    
  }
);




module.exports = mongoose.model("Post", Post);
