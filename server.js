const express = require("express"); 
const app = express();
//routes 
const apiRoutes = require('./routes/apiRoutes');

const PORT = process.env.PORT || 3001;


//for incoming string or array
app.use(express.urlencoded({extended: true}));

//linkig the app to apiRoutes
app.use("/api", apiRoutes);



//server now opening  
app.listen(PORT, () =>{
    console.log(`server is running on ${PORT}`)
})





