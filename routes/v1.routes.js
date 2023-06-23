const express = require("express");
const V1Routes = express.Router();
const AuthRoute = require("./auth.routes.js");
const UploadRoute = require("./upload.routes");
const PostRoute = require("./post.routes");
const UserRoute = require("./user.routes.js")
const NoficationRoute = require("./nofitication.routes.js");
const { SendMessage } = require("../services/nofitication/index.js");
V1Routes.use("/user", UserRoute)
V1Routes.use("/auth", AuthRoute.route);
V1Routes.use("/upload", UploadRoute);
V1Routes.use("/post", PostRoute);
V1Routes.use("/nofiti", NoficationRoute);
V1Routes.post("/testnofti", (req, res, next) => {
    const BodyCLient = req.body;
    SendMessage(BodyCLient["iduser"], BodyCLient["msg"])
    return res.json("jkshfklhjd")
})
module.exports = { V1Routes };
