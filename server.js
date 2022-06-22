
//dependent variables defined
const express = require("express"); 
const path = require("path");
const fs = require("fs");
const util = require("util");

//for incoming string or array
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //incoming json data

//server setup
const app = express();
const PORT = process.env.PORT || 3001;

//static middleware
app.use(express.static(""))

const readFile = util.promisify(fs.promisify(fs.readFile));
const writeFile = util.promisify(fs.promisify(fs.writeFile));

//API ROUTE | 'GET' 
app.get("/api/notes", function(req, res){
    readFile("../../db/d");

})









//server now opening  
app.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`)
})





