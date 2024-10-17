const express = require("express");
const {PORT,MongooseUrl} = require('./config')
const mongoose = require("mongoose")
const cors = require("cors")
const app = express();
app.use(cors())

app.use(express.json())
app.use("/user",require('./Router/user.js'))
app.use('/upload',express.static("./Uploads"))  // when we are going to call at /upload it is going to show the images inside Uploads folder In the context of express.static("./Uploads"), the term "static" refers to files that are served directly to the client without any server-side processing or dynamic generation.

mongoose.connect(MongooseUrl)
.then(() => {
    console.log("Mongoose Connected");
    app.listen(PORT,()=>{
        console.log(`Server running on port no:${PORT}`);
    }) 
}).catch((err) => {
    console.log(`Mongoose Connection Error ${err}`);
    
});
