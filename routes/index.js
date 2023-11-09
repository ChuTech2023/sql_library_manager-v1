var express = require('express');
var router = express.Router();

const {Book} = require('../models')

/* GET home page. */
router.get('/', async function(req, res, next) {
  //res.render('index', { title: 'Express' });
  try {
    const dbData = await Book.findAll()
    console.log(dbData)
    res.json(dbData)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
