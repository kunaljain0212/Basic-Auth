const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//Importing routes
const authRoutes = require("./routes/auth");

const app = express();
dotenv.config();

//DATABASE CONNECTION
mongoose.connect(
  process.env.DATABASE_URL,
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true },
  () => {
    console.log("DATABASE CONNECTED");
  }
);

//Middlewares
app.use(express.json());

//Routes
app.use("/api/auth", authRoutes);

//Server
app.listen(3000, () => {
  console.log("SERVER RUNNING ON 3000");
});
