const express = require("express"); 
const app = express();

const path = require("path");

//api route located on different file. 
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;


//for incoming string or array
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//static middleware
app.use(express.static("./public"));

//linkig the app to apiRoutes
app.use("/api", apiRoutes);

//server now opening  
app.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`)
})


//HTML Routes 
app.get ('./notes',  function(req, res){
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
})
app.get ('/',  function(req, res){
    res.sendFile(path.join(__dirname, "../../public/index.html"));
})
app.get ('*',  function(req, res){
    res.sendFile(path.join(__dirname, "../../public/notes.html"));
})



