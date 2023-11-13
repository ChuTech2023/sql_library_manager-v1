var express = require('express');
var router = express.Router();
const {Book} = require('../models')

/* List all books */
router.get('/', async function(req, res, next) {
  try {
    const books = await Book.findAll()
    res.json(books)
  } catch (error) {
    next(error)
  }
});

router.get('/new', function(req,res, next){
    res.render('new-book')
})

router.post('/new', async(req,res,next) => {
    try {
        const newBook = await Book.create(req.body)
        res.redirect('/books')
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async function (req, res, next){
    try {
       const book = await Book.findByPk(req.params.id) 
       res.render('update_book', {book})
    } catch (error) {
        next(error)
    }
})

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
        next(error)
    }
})

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




// Express Routes and CRUD Operations
// You'll often wire Express routes to your SQL-based database via Sequelize ORM. The following demonstrates how you might use Sequelize within an Express application to perform CRUD operations:

// const { Router } = require('express');
// const { Movie } = require('../models');

// const router = new Router();

// /* POST create movie */
// router.post('/', async (req, res, next) => {
//   const movie = await Movie.create(req.body);
//   res.redirect('/movies/' + movie.id);
// });

// /* GET / retrieve movie to update */
// router.get('/:id/edit', async (req, res, next) => {
//   const movie = await Movie.findByPk(req.params.id);
//   res.render('movies/edit', { movie, title: 'Edit Movie' });
// });

// /* PUT update movie */
// router.put('/:id', async (req, res, next) => {
//   const movie = await Movie.findByPk(req.params.id);
//   await movie.update(req.body);
//   res.redirect('/movies/' + movie.id);
// });

// /* Delete movie */
// router.post('/movies/:id/delete', async (req, res) => {
//   const movieToDelete = await Movie.findByPk(req.params.id);
//   await movieToDelete.destroy();
//   res.redirect('/movies');
// });
