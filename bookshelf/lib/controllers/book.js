module.exports = function(app) {
  var Controller = { name: 'BookController' },
      BookModel = app.models.BookModel;
  

  Controller.new = function(req, res) {
    res.render('books/new', {page: 'new'});
  }
  
  Controller.edit = function(req, res) {
    var isbn = req.params.id;
    BookModel.read(isbn, function(error, book) {
      if(error) {
        res.render('books/bookshelf', {error: error});
      } else {
        res.render('books/edit', {page: 'edit', book: book});
      }
    });
  }

  Controller.create = function(req, res) {
    var book = {
      title: req.body.title,
      author: req.body.author,
      description: req.body.description,
      isbn: req.body.isbn
    };
    BookModel.create(book, function(error) {
      if(error) {
        res.send(error.code, error);
      } else {
        res.send(201);
      }
    });
  };
 
  Controller.list = function(req, res){
    BookModel.list({}, function(error, books) {
      console.log(books)
      res.format({
        html: function(){
          if(error) {
            res.render('books/bookshelf', {error: error});
          } else {
            res.render('books/bookshelf', {books: books});
          }
        }, 
        json: function(){
          if(error) {
            res.send(error.code, error);
          } else {
            res.send(200, books);
          }
        }
      });
    });
  };

   Controller.show = function(req, res) {
    var isbn = req.params.id;
    BookModel.read(isbn, function(error, book) {
      res.format({
        html: function(){
          if(error) {
            res.render('books/bookshelf', {error: error});
          } else {
            res.render('books/book', {book: book, page:'book'});
          }
        }, 
        json: function(){
          if(error) {
            res.send(error.code, error);
          } else {
            res.send(200, book);
          }
        }
      });
    });
  }
  
  return Controller;
}