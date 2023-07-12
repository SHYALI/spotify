const mongoose = require("mongoose");

const playlist   = new mongoose.Schema({

    name: {
          type : string,
          required:true,
    },
    thumbnail:{
        type : string ,    // thumbnail data type is not image bcoz we are going to copy url 
        required : true ,
    },

    
    owner:{
        type : mongoose.Types.ObjectId,
        ref : "user" ,
    },
    
    // 1.)playlist mein song kuan sa hai
    // 2.) playlist collaborators 

    song:[
    {
        type : mongoose.Types.ObjectId ,
        ref : "song"  ,
    },
],// list of song under playlist (array)

collaborators :[
    {
        type :mongoose.Type.ObjectId,
        ref: "user",
    },
],  // we can have multiple collabortator hence list 

});

const playlistmodel = mongoose.model("playlist", playlist);

module.export = playlistModel;