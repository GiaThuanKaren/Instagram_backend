const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}))
const PORT = process.env.PORT || 5500;
app.use(cors({
  origin:"*"
}))
app.use(express.json());

const { V1Routes } = require("./routes/v1.routes.js");
const { Connnection } = require("./conf/mongo.js");

// ConnectPrismaClient()
Connnection();

app.use("/api", V1Routes);
app.listen(PORT, () => {
  console.log(`Listening at ${PORT} port`);
});
