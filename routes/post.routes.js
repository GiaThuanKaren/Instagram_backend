const express = require("express");
const route = express.Router();
const multer = require("multer");
const upload = multer();
const PostController = require("../controllers/post");
let storage = multer.diskStorage({
  destination: (req, file, res) => {
    res(null, "./upload");
  },
  filename: (req, file, res) => {
    res(null, file.originalname);
  },
});



route.get("/get_user",PostController.searchUser);
route.get("/get_all_post", PostController.getAllPost)
route.post("/cr_new_comment", PostController.insertNewComment)
route.post("/get_all_cmt", PostController.getAllCommentInPost)
route.post("/get_all_replied_cmt", PostController.getCommentByIdParent)
route.post("/react_post",PostController.handleReaction)

route.post("/get_all_userpost", PostController.getAllUserPost)

route.post(
  "/cr_new_post",
  upload.array("tenfile"),
  PostController.createNewPost
);

route.post("/del_user_post", PostController.deleteUserPost);

route.post(
  "/update_user_post",
  upload.array("media"),
  PostController.updateUserPost
);

module.exports = route;
