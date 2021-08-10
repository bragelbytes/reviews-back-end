const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/user.js')


sessions.post('/', (req,res) => {
   User.findOne({username: req.body.username}, (err, foundUser) => {
      if(err){
         console.log(err);
         alert(`we've detected an error with the DB`);
      } else if (!foundUser){
         //alert instead of a redirect?
         alert('User not Found');
      } else {
         if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentUser = foundUser
         } else {
            //alert instead of a redirect?
            alert(`Password Does Not Match Our Records`);
         }
      }
   })
})


sessions.delete('/', (req,res) => {
   req.session.destroy(() => {
      //alert instead of a redirect?
      alert(`sessions ended`);
   })
})

module.exports=sessions;
