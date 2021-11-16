var express = require('express');
var router = express.Router();
const { Question } = require('../db/models')
const { asyncHandler } = require('../routes/utils')
/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  res.render('index', { title: 'Nap-Overflow' });
}));

module.exports = router;
