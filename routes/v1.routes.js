const express = require("express");
const V1Routes = express.Router();
const AuthRoute = require("./auth.routes.js");
const UploadRoute = require("./upload.routes");
V1Routes.use("/auth", AuthRoute.route);
V1Routes.use("/upload", UploadRoute);

module.exports = { V1Routes };
