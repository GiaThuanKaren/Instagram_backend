const express = require("express");
const route = express.Router();
const { PrismaClient } = require("@prisma/client");

const User = require("../models/User");
const AuthController = require("../controllers/auth/auth.controller");
const prisma = new PrismaClient();
route.post("/login", AuthController.Login);

route.post("/register", AuthController.Register);

module.exports = { route };
