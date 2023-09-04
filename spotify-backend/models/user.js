const mongoose = require("mongoose");

const User = new mongoose.Schema({

    firstname: {
          type : String,
          required:true,
    },
    lastname:{
        type : String ,
        required : false ,
    },

    email:{
        type : String ,
        required : true  ,
    },

    username:{
        type : String ,
        required : true ,
    },

    likedsong:{
        // we will change this to array later 
        type : String ,
        default : "",
    },

    likedplaylist:{
        // we will change this to array later 
        type : String ,
        default : "",
    },

    subscribedArtist: {
        // we will change this to array later 
        type : String ,
        default : ""
    },

});

const UserModel = mongoose.model("User", User);

module.exports = UserModel;