var express = require('express');
var router = express.Router();
const { Question } = require('../db/models')
const { asyncHandler } = require('../routes/utils')
const Op = require("sequelize").Op;

/* GET home page. */
router.get('/', asyncHandler(async(req, res, next) => {
  res.render('index', { title: 'Nap-Overflow' });
}));

router.get(
  "/search",
  asyncHandler(async (req, res) => {
    const { searchTerm } = req.query;

    const questions = await Question.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            content: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ],
      },
    });

    res.render("search", { questions, searchTerm });
  })
);


// router.post(
//   "/search",
//   asyncHandler(async (req, res) => {
//     const { searchTerm } = req.body;
//     res.redirect(`/questions/search/${searchTerm}`);
//   })
// );


module.exports = router;
