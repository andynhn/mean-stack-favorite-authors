console.log("inside of server/config/mongoose.js");

module.exports = function (db_name){
    const mongoose = require("mongoose");
    const fs = require("fs");
    const path = require("path");
    mongoose.connect('mongodb://localhost/' + db_name);
    mongoose.Promise = global.Promise;
    
    for(let file of fs.readdirSync(path.join(__dirname, "../models"))){
        if(file.endsWith(".js")){
            require(path.join(__dirname, "../models", file));
        }
    }
}