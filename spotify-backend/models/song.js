const mongoose = require("mongoose");

const song  = new mongoose.Schema({

    name: {
          type : String,
          required:true,
    },
    thumbnail:{
        type : String ,    // thumbnail data type is not image bcoz we are going to copy url 
        required : true ,
    },

    track:{
        type : String ,
        required : true  ,
    },

    artist:{
        type : mongoose.Types.ObjectId,
        ref : "user" ,
    },

    

});

const Songmodel = mongoose.model("Song", Song);

module.exports = SongModel;