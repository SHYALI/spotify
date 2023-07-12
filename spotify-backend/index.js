const express = require("express");
const mongoose= require("mongoose");
require("dotenv").config();
const app = express();
const port = 8000;


//console.log(process.env);

mongoose.connect("mongodb+srv://shyali:"+
process.env.MONGO_PASSWORD+
"@cluster0.zeiv09m.mongodb.net/?retryWrites=true&w=majority",
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

app.get("/",(req,res)=>{

    res.send("Hello World ");
});


app.listen(port, ()=>{

    console.log("app is running on "+ port);

});