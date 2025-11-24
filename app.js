const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const v1Router = require("./routes/v1");

dotenv.config();
const app = express();
app.use(express.json());
app.use("/v1", v1Router);
app.get("/", (req, res) => {
  res.send("hello");
});
app.use(errorHandler);

module.exports = app;
