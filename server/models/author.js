console.log("inside of server/models/author.js");

const mongoose = require("mongoose");

const AuthorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, "Author name is required"], 
        minlength: [3, "Author name must be at least 3 characters"],
        lowercase: true,
    },
}, {timestamps: true})

mongoose.model("Author", AuthorSchema);