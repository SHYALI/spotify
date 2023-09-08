const express = require("express");
const router = express.Router();
const passport = require("passport");
const Song = require("../models/Song");


router.post("/create",
passport.authenticate("jwt",{session:false}),
 async(req,res)=>
{
    // reg.get the user because of passport authentication 
     const {name,thumbnail,track} = req.body;
     if(!name || !thumbnail || !track){
        return res.status(301).json({err:"insufficient detail to create song "});
     }
     const artist =req.user._id;
     const songDetail= {name ,thumbnail,track,artist};
     const createdSong  = await Song.create(songDetail);
     return res.status(200).json(createdSong);
}
);

// get route to all the songs i have published 
router.get("/get/mysongs",passport.authenticate("jwt" , {session:false}), async(req,res)=>
{
const currentUser = req.user;
//we need to get all song where artist_id == currentUser._id
const songs = await Song.find({artist:req.user._id});
return req.status(200).json({data :songs});
});


module.exports = router;
