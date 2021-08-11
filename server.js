//depedencies
const express = require("express");
const mongoose = require("mongoose");
const cors = require ("cors");
const session = require('express-session');
const app = express()
const db = mongoose.connection
const reviewsController = require("./controllers/reviews.js");
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js')
require("dotenv").config()

//config
const PORT = process.env.PORT || 3003;
const MONGODB_URI = process.env.MONGODB_URI;

//Error / Success
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected "));

//Middleware
app.use(
   session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: false
   })
);
app.use(express.json())
app.use(cors())
app.use("/reviews", reviewsController)
app.use('/users', userController)
app.use('/sessions', sessionsController)

//Heroku
app.get("/", (req, res) => {
  res.redirect("/reviews")
})

app.listen(PORT, () => {
  console.log("listening for Project 3 on port:", PORT);
})
mongoose.connect(
  MONGODB_URI,
  {useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify:false},
  () => {
    console.log("connected to mongod");
  }
)
