const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = multer();

let storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./upload");
  },
  filename: (req, file, res) => {
    res(null, file.originalname);
  },
});
const PostController = require("../controllers/post");

route.post(
  "/cr_new_post",
  upload.array("tenfile"),
  PostController.createNewPost
);

route.post("/del_user_post", PostController.deleteUserPost);

module.exports = { route };
