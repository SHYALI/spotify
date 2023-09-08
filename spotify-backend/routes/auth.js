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
    
    const user = await User.findOne({email: email});    

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
  // xyz asjkdnfvkjfbnkbngkjbnkjgnbgkjngjn
  //my hash depend on two parameters 
  // if we keep those two parameter same then xyz always gives the same hash 

  
 const hashedPassword = await bcrypt.hash(password,10);
const newUserData = {
    email,
    password: hashedPassword,
    firstName,
    lastName,
    username,
};

const newUser = await  User.create(newUserData);
console.log(newUserData);

// step -4: we want to create a token to return to the user 

const token = await getToken(email,newUser);


// step-5 :return the result to the user 

const userToReturn = {...newUser.toJSON(),token};
console.log(userToReturn);
delete userToReturn.password;
return res.status(200).json(userToReturn)

});

router.post("/login", async(req,res)=>
{
    // step 1 : get email and password send by the user by reg.body

    const {email,password} = req.body;

    // step 2 : check the user with given id exist or not , if not the credentials are :)

    const user = await User.findOne({email:email});

    if(!user){
        return res.status(403).json({err:"invalid credentials"});
    }
    // step 3 : if the user exist ,check the password is correct if not then the credentials are invalid 
    // this is a tricky step.because we have stored the original password in the hashed form ,which we cannot use to get the origin password 
    // we cannot do if(password==userpassword)
    //bcrypt.compare us to compare one password into plaintext(password form reg.body) to a hashed password (the one which is secure)
    const isPasswordValid = await bcrypt.compare(password ,user.password)
    // this will be true or false 
    if(!isPasswordValid){
        return res.status(403).json({err:"invalid credentials "})
    }

    // step 4 : if the credentials are correct return the token to the user 

    const token = await getToken(user.email,user);
    const userToReturn = {...user.toJSON(),token};
    console.log(userToReturn);
    delete userToReturn.password;
    return res.status(200).json(userToReturn)

});

module.exports = router;