const express = require("express");
const V1Routes = express.Router();
const AuthRoute = require("./auth.routes.js");
const UploadRoute = require("./upload.routes");
const PostRoute = require("./post.routes");
const NoficationRoute = require("./nofitication.routes.js")
V1Routes.use("/auth", AuthRoute.route);
V1Routes.use("/upload", UploadRoute);
V1Routes.use("/post", PostRoute);
V1Routes.use("/nofiti", NoficationRoute);
module.exports = { V1Routes };
