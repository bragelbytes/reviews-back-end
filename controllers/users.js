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
users.put('/', (req,res) => {
   User.findOne({username: req.body.username}, (err, foundUser) => {
      if(err){
         console.log(err);
         res.json(`we've detected an error with the DB`);
      } else if (!foundUser){
         //alert instead of a redirect?
         res.json('User not Found');
      } else {
         if(bcrypt.compareSync(req.body.password, foundUser.password)){
            res.json({username: foundUser.username})
         } else {
            //alert instead of a redirect?
            res.json(`Password Does Not Match Our Records`);
         }
      }
   })
})
module.exports = users
