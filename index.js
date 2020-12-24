const express = require("express");
const mongoose = require("mongoose");

//Importing routes
const authRoutes = require("./routes/auth");

const app = express();

//DATABASE CONNECTION
mongoose.connect(
  "mongodb+srv://kunal:rakk2622@cluster0.qysx0.mongodb.net/<dbname>?retryWrites=true&w=majority",
  { useNewUrlParser: true },
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
