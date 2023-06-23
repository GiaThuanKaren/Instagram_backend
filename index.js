const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
var winston = require('winston'), expressWinston = require('express-winston');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
const PORT = process.env.PORT || 5500;
app.use(cors({
  origin: "*"
}))
app.use(express.json());
app.use(expressWinston.logger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json(),
    winston.format.simple(),
    winston.format.prettyPrint()
  ),
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: true,
   // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; }, // optional: allows to skip some log messages based on request and/or response


}));


const { V1Routes } = require("./routes/v1.routes.js");
const { Connnection } = require("./conf/mongo.js");

// ConnectPrismaClient()
Connnection();

app.use("/api", V1Routes); +
  app.listen(PORT, () => {
    console.log(`Listening at ${PORT} port`);
  });

const logger = winston.createLogger({
  level: 'http',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
