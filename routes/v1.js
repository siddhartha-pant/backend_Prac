const express = require("express");
const v1Router = express.Router();
const authRouter = require("./authRoutes");
const noteRouter = require("./noteRoutes");
v1Router.use("/auth", authRouter);
v1Router.use("/notes", noteRouter);

module.exports = v1Router;
