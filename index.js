const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

//Importing routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

//Intialization and configuration
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
app.use(cors());

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);

//Server
app.listen(5000, () => {
  console.log("SERVER RUNNING ON 5000");
});
