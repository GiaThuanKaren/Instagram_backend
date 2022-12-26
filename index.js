const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const { V1Routes } = require("./routes/v1.routes.js");

app.use("/api", V1Routes);

app.listen(PORT, () => {
  console.log(`Listening at ${PORT} port`);
});
