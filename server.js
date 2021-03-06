
//dependent variables defined
const express = require("express"); 
const path = require("path");
const fs = require("fs");
const util = require("util");

//server setup
const app = express();
const PORT = process.env.PORT || 3001;

//for incoming string or array
app.use(express.urlencoded({extended: true}));
app.use(express.json()); //incoming json data

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);


//static middleware
//so the page can pick up any static files 
app.use(express.static("./public"));


//API ROUTE | 'GET' 
//converting all into an array and format 
app.get("/api/notes", function(req, res){
    readFile("./db/db.json", "utf8").then(function(data){
        notes = [].concat(JSON.parse(data));
        res.json(notes);
    });

})

//API ROUTE | 'POST'
//pushing everything into an array just like the get request
app.post("/api/notes", function(req, res){
    const note = req.body; 
    readFile("./db/db.json","utf8").then(function(data){
        const notes = [].concat(JSON.parse(data));
        note.id = notes.length + 1
        notes.push(note);
        return notes
    }).then(function(notes){
        writeFile("./db/db.json", JSON.stringify(notes))
        res.json(note);
    })
})

//API ROUTE | 'DELETE'  BONUS!!!
//NOT SURE IF IT COMPLETELY WORKS 
//it targets the post you want to delete and it will rewrite everything.
app.delete("/api/notes/:id", function(req, res){
    const deleteNote = parseInt(req.params.id);

    readFile ("./db/db.json", "utf8").then(function(data){
        const notes = [].concat(JSON.parse(data));
        const newNote = []
        for (var i = 0; i<notes.length; i++) {
            if(deleteNote != notes[i].id){
                newNote.push(notes[i])
            }
        }
        return newNote
    }).then(function(notes){
        writeFile("./db/db.json", JSON.stringify(notes))
        res.send('data saved!');
    })
})
//HMTL ROUTES
//it ensures we get to the notes page.
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname,"./public/notes.html"));
});
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname,"./public/index.html"));
});
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname,"./public/index.html"));
});

//server now opening  
app.listen(PORT, () =>{
    console.log(`server is running on http://localhost:${PORT}`)
});





