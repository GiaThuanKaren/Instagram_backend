const express = require("express");
const route = express.Router();

route.post("/login", (req, res, next) => {
  console.log(123);
  res.send("Hielloo Login");
});

route.post("/register", (req, res, next) => {
  res.send("Hello Register");
});

module.exports = { route };
