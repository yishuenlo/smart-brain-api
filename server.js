//import express
const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const image = require("./controllers/image");

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "admin",
    database: "smart-brain",
  },
});

//run express
const app = express();

//must use this middleware to read json file
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send(database.users);
});

//use POST to send password
// /signin --> POST user info; return success / fail
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// /register --> POST new user info; return new user
app.post("/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

// /profile/:userId unique home page for each user. GET = user info
//display user proflie
app.get("/profile/:id", (req, res) => profile.handleProfile(req, res, db));

// /image --> PUT (user already exist, update profile) = updated user info
//update user to increase their entry count
app.put("/image", (req, res) => {
  image.handleImageCount(req, res, db);
});

app.post("/imageurl", (req, res) => {
  image.handleAPICall(req, res);
});


//port 3000
app.listen(3001, () => {});
