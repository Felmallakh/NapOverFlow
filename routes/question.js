const express = require('express');
const { check, validationResult } = require('express-validator');

const { asyncHandler, csrfProtection } = require("./utils");
const { Question } = require('../db/models');
const { requireAuth } = require('../auth');

const router = express.Router();

router.get('/new', requireAuth, csrfProtection, (req, res) => {
    res.render('new-question', { csrfToken: req.csrfToken(), title: 'Ask Question', question: {} });
});

module.exports = router;
