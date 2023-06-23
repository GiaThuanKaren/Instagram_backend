const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

router.post(`/folOrUnFolUser`,UserController.followOrUnfollowUser);



module.exports = router 