const mongoose = require("mongoose");

const song  = new mongoose.Schema({

    name: {
          type : string,
          required:true,
    },
    thumbnail:{
        type : string ,    // thumbnail data type is not image bcoz we are going to copy url 
        required : true ,
    },

    track:{
        type : string ,
        required : true  ,
    },

    artist:{
        type : mongoose.Types.ObjectId,
        ref : "user" ,
    },

    

});

const songmodel = mongoose.model("song", song);

module.export = songModel;