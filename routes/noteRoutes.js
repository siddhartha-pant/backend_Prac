const express = require("express");
const noteRouter = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/notesController");

noteRouter.post("/", auth, createNote);
noteRouter.get("/", auth, getNotes);
noteRouter.put("/:id", auth, updateNote);
noteRouter.delete("/:id", auth, deleteNote);

module.exports = noteRouter;
