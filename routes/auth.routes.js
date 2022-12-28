const express = require("express");
const route = express.Router();

const User = require("../models/User");
const AuthController = require("../controllers/auth/auth.controller");

route.post("/login", AuthController.Login);

route.post("/register", AuthController.Register);

module.exports = { route };
