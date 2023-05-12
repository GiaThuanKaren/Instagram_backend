const express = require("express");
const NoficationController = require("../controllers/nofication");
const route = express.Router();


route.post("/update_token", NoficationController.updateToken)





module.exports = route
