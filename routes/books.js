var express = require('express');
var router = express.Router();
const {Book} = require('../models')

/* List all books */
router.get('/', async function(req, res, next) {
  try {
    const books = await Book.findAll()
    res.render('index', {books, title: "Book List"})
  } catch (error) {
    next(error)
  }
});

// show page with form
router.get('/new', function(req,res, next){
    res.render('new-book', {title: "New Book"})
})

//Add new book to database
router.post('/new', async(req,res,next) => {
    try {
        const newBook = await Book.create(req.body)
        res.redirect('/books')
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            res.render('new-book', {title: "New Book", error: error.errors}) 
        } else {
            next(error)
        }
        
    }
})

//Shows book details
router.get('/:id', async function (req, res, next){
    try {
       const book = await Book.findByPk(req.params.id) 
       res.render('update-book', {book, title: book.title})
    } catch (error) {
        next(error)
    }
})

//Update books
router.post('/:id', async (req, res, next) => {
    try {
        const updatedBook = await Book.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if (!updatedBook) {
            const err = new Error("No Book Found.")
            err.status = 404
            next(err)
            return
        }
        res.redirect('/books')
    } catch (error) {
        if (error.name === "SequelizeValidationError") {
            let book = await Book.build(req.body)
            res.render('new-book', {book, title: "New Book", error: error.errors}) 
        } else {
            next(error)
        }
        
    }
})

//delete books
router.post('/:id/delete', async (req, res, next) => {
    try {
        const deletedBook = await Book.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!deletedBook) {
            const err = new Error("No Book Found.")
            err.status = 404
            next(err)
            return
        }
        res.redirect('/books')
    } catch (error) {
        next(error)
    }
})


module.exports = router;

