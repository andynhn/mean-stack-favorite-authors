console.log("inside of server/controllers/authors.js");

const mongoose = require("mongoose"),
        Author = mongoose.model("Author");

class Authors {
    getAuthors(req, res){
        Author.find({}).sort({"name": 1}).exec( function(err,authors){
            if(err) {
                res.json({"status": "not ok", "errors": err})
            } else {
                res.json({"status": "ok", "authors": authors});
            }
        });
    }
    getAuthor(req, res){
        Author.findById(req.params.id, function(err, author) {
            if(err) {
                res.json({"status": "not ok", "errors": err});
            } else {
                res.json({"status": "ok", "author": author});
            }
        });
    }
    createAuthor(req, res){
        Author.findOne({name: req.body.name}, function(err, author){
            if(author){
                // res.json({"status": "repeat author", "message": "This author already exists in the database"});
                res.json({"status": "not ok", "errors": {"errors": {"repeat": {"message": "This author already exists in the database"}}}});

            } else {
                let author = new Author(req.body);
                author.save(function(err) {
                    if(err) {
                        res.json({"status": "not ok", "errors": err});
                    } else {
                        res.json({"status": "ok"});
                    }
                });
            }
        });
    }

    updateAuthor(req, res){
        var flag = true;
        Author.find({_id: { $nin: req.params.id }}, function(err, authors){
            for(let entry of authors){
                console.log(entry, entry.name)
                if(entry.name == req.body.name.toLowerCase()){
                    flag = false;
                    res.json({"status": "not ok", "errors": {"errors": {"repeat": {"message": "This Author already exists in the database"}}}});
                    break;
                } 
            }
            if (flag == true){
                Author.findByIdAndUpdate(req.params.id, req.body, {runValidators: true}, function(err, author) {
                    if(err) {
                        res.json({"status": "not ok", "errors": err});
                    } else {
                        res.json({"status": "ok"});
                    }
                });
            }
        });
    }
    deleteAuthor(req, res){
        Author.findByIdAndDelete(req.params.id, function(err) {
            if(err) {
                res.json({"status": "not ok", "errors": err});
            } else {
                res.json({"status": "ok"});
            }
        });
    }
}
module.exports = new Authors();