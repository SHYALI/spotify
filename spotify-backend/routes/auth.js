const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const {getToken}=require("../utils/helper");

    // this code is run when /register is called as a POST request
router.post("/register", async (req,res) => {

 
    // my req.body will be of format {email , password, first name , last name  ,username }
    const {email,password,firstName,lastName, username} = req.body;


    //  step 2 --> doesnt the user of this email already exist ? if yes then we throw an error 
    
    const User = await User.findOne({email: email});    

   if (user){

    //status code by default is 200 
    return res
    .status(403)
    .json({error: "user of this email already exist "});

   }
   // this is a valid request 
  // step - 3 create the new user in the DB
  // step - 3.1 we dont store password in plain text 
  // xyz  we convert the plain text password to hash 
  
 const hashedPassword = await bcrypt.hash(password,10);
const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
};

const newUser = await User.create(newUserData);
console.log(newUserData);

// step -4: we want to create a token to return to the user 

const token = await getToken(email,newUser);


// step-5 :return the result to the user 

const userToReturn = {...newUser.toJSON(),token};
console.log(userToReturn);
delete userToReturn.password;
return res.status(200).json(userToReturn)

});

module.exports = router;