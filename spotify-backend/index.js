const express = require("express");
const mongoose= require("mongoose");
const  JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require("passport");
const User = require("./models/User");
const authRoutes=require("./routes/auth");   
require("dotenv").config();
const app = express();
const port = 8000;

app.use(express.json()); 

//console.log(process.env);

mongoose.connect("mongodb+srv://spotify:"+
process.env.MONGO_PASSWORD +
"@cluster0.uojulql.mongodb.net/?retryWrites=true&w=majority",
{
 useNewUrlParser : true,
 useUnifiedTopology : true
}
).then((x)=>{
    console.log("connected to mongodb!");
})
// .catch((err)=>{
//     console.log("error while connecting to mangodb ")
// });

//set up passport-jwt 


let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "ThisKeyIsSupposeToBeSecrete";
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({id: jwt_payload.sub}, function(err, user) {
        // done(error, doesTheUserExist)
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));

app.get("/",(req,res)=>{

    res.send("Hello World ");
});

app.use("/auth",authRoutes);

app.listen(port, ()=>{

    console.log("app is running on "+ port);

});