console.log("inside of server/config/routes.js")

const Author = require("../controllers/authors.js");
const path = require('path');

module.exports = function(app) {
    app.get('/authors', function(req, res) {
        Author.getAuthors(req, res);
    });
    app.get('/authors/:id', function(req, res) {
        Author.getAuthor(req, res);
    });
    app.post('/authors', function(req, res) {
        Author.createAuthor(req, res);
    });
    app.put('/authors/:id', function(req, res) {
        Author.updateAuthor(req, res);
    });
    app.delete('/authors/:id', function(req, res) {
        Author.deleteAuthor(req, res);
    });
    app.all("*", (req,res,next) => {
        res.sendFile(path.resolve("../widgets/public/dist/public/index.html"))
    });
}