const express = require("express");
const V1Routes = express.Router();
const AuthRoute = require("./auth.routes.js");
const UploadRoute = require("./upload.routes");
const PostRoute = require("./post.routes");
V1Routes.use("/auth", AuthRoute.route);
V1Routes.use("/upload", UploadRoute);
V1Routes.use("/post", PostRoute.route);
module.exports = { V1Routes };
