const bcrypt = require('bcrypt');
const express = require('express');
const users = express.Router();
const User = require('../models/user.js');

users.get("/", (req, res) => {
  User.find({}, (error, foundUsers) => {
    res.json(foundUsers)
  })
})
users.post('/', (req,res) => {
   req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
   User.create(req.body, (err, createdUser) => {
      console.log('User is Created: ', createdUser);
   })
})
users.delete("/:id", (req, res) => {
     User.findByIdAndRemove(req.params.id, (error, deleteUsers) => {
       res.json(deleteUsers)
     })
   })
module.exports = users
