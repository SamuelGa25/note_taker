const router = require("express").Router();

const {notes} = require("../../db/db.json")

const fs = require("fs");

const { dirname } = require("path");
const path = require("path");


//function creating the new note
function newNote(body, array){
    let note = body;
    if (body){
        array.push(note);
    }
    fs.writeFileSync (
        path.join(__dirname, "../../db/db.json"),
        JSON.stringify({notes: array}, null, 2)
    );

    return note

};

//validating the note so it gets approved.
function approveNote(note){
    if (!note.title || typeof note.title !="string"){
        return false;
    }else if (!note.text || typeof note.text !="string"){
        return false;
    }
    return true
};


router.get("/notes",(req, res) => {
    let result = notes;
    res.json(result);

});

//setting on what the next id of array, will be and also adding to the database. 
router.post("/notes",(req, res) => {
    req.body.id = notes.length.toString();

    if(!approveNote(req.body)){
        res.status(400).send("It is not formatted.");
    }else{
        const note = createNewNote(req.body, notes);
        res.json(notes);
    }
});

router.delete("/notes/:id",(req, res) => {

    var id = req.params.id;
    //checking if id matches 
    if (notes[id].id == id ){
        notes.splice(id,1);
    }else{
        res.status(400).send("ID not found!")
    }

    //to not make duplicates 
    var no = 0;
    function checkNo (note){
        note.id = no.toString();
        no += 1;
    }
    notes.forEach(checkNo);
    res.json(true);

});

module.exports = router;



