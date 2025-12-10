const dotenv = require("dotenv");
const mongoose = require("mongoose");
dotenv.config();

const app = require("./app"); // <-- IMPORTANT

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT || 5000, "0.0.0.0", () => {
      console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
