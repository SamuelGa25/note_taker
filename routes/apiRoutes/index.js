//linking to router 
const router = require("express").Router();

//linking index.js to routes.js
const notes = rquire("./notes.js");

router.use(notes);

module.exports = router;

