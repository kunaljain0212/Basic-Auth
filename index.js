const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//Importing routes
const authRoutes = require("./routes/auth");

const app = express();

//DATABASE CONNECTION
mongoose.connect(
  process.env.DATABASE_URL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("DATABASE CONNECTED");
  }
);

//Routes
app.use("/api/auth", authRoutes);

//Server
app.listen(3000, () => {
  console.log("SERVER RUNNING ON 3000");
});
