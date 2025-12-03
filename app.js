const express = require("express");
const dotenv = require("dotenv");
const errorHandler = require("./middleware/errorHandler");
const v1Router = require("./routes/v1");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use("/v1", v1Router);
app.get("/", (req, res) => {
  res.send("hello");
});
app.use(errorHandler);

module.exports = app;
