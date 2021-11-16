var express = require('express');
var router = express.Router();
var db = require('../db/models');
var bcrypt = require('bcryptjs');

const { loginUser, logoutUser } = require('../auth');
const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require("./utils");

router.get('/login', csrfProtection, (req, res) => {
  res.render('user-login', {
    title: 'Login',
    csrfToken: req.csrfToken(),
  });
});

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide valid email address"),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Password cannot be empty"),
];

router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const {
      email,
      password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req, res, errors);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { email } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

        if (passwordMatch) {
          loginUser(req, res, user);
          return res.redirect('/');
        };
      }
      errors.push('Login failed for the given email address and password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render('user-login', {
      title: 'Login',
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  res.redirect('/');
});

router.get('/demo', asyncHandler(async (req, res) => {
  const user = await db.User.findByPk(1);
  loginUser(req, res, user);
  return res.redirect('/');
}));

module.exports = router;
