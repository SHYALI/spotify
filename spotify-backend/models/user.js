const mongoose = require("mongoose");

const user = new mongoose.Schema({

    firstname: {
          type : string,
          required:true,
    },
    lastname:{
        type : string ,
        required : false ,
    },

    email:{
        type : string ,
        required : true  ,
    },

    username:{
        type : string ,
        required : true ,
    },

    likedsong:{
        // we will change this to array later 
        type : string ,
        default : "",
    },

    likedplaylist:{
        // we will change this to array later 
        type : string ,
        default : "",
    },

    subscribedArtist: {
        // we will change this to array later 
        type : string ,
        default : ""
    }

});

const userModel = mongoose.model("user", user);

module.export = userModel;