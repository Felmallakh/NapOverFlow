const express = require('express');

const { asyncHandler, csrfProtection } = require("./utils");

const router = express.Router();

router.get('/new', csrfProtection, (req, res) => {
    res.render('new-question', { csrfToken: req.csrfToken(), create: {} });
});

module.exports = router;
