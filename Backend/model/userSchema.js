const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        requried: true
    },
    imgpath:{
        type: String,
        requried: true
    },
    Date:{
        type:Date
    }
})

module.exports = mongoose.model('imgUp',userSchema)