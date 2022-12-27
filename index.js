const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
const bodyParser = require("body-parser");
const { V1Routes } = require("./routes/v1.routes.js");
const { Connnection } = require("./conf/mongo.js");
Connnection();
app.use("/api", V1Routes);
app.listen(PORT, () => {
  console.log(`Listening at ${PORT} port`);
});
