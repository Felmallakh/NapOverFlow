const express = require('express');
const { check, validationResult } = require('express-validator');

const { Question } = require('../db/models');
const { asyncHandler, csrfProtection } = require("./utils");
const { requireAuth } = require('../auth');

const router = express.Router();

const questionValidator = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title for your question')
        .isLength({ max: 255 })
        .withMessage('Title cannot be longer than 255 characters')
        .custom(value => {
            return Question.findOne({
                where: { title: value }
            })
                .then(question => {
                    if (question) {
                        return Promise.reject('This question has already been asked, search for the thread')
                    }
                });
        }),
    check('content')
        .exists({ checkFalsy: true })
        .withMessage('Please provide content for your question')
];

router.get('/new', requireAuth, csrfProtection, (req, res) => {
    res.render('new-question', { csrfToken: req.csrfToken(), title: 'Ask Question', question: {} });
});

router.post('/', requireAuth, questionValidator, csrfProtection, asyncHandler(async (req, res) => {
    const { title, content } = req.body;
    const question = await Question.build({
        title, content, userId: res.locals.user.id
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await question.save();
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('new-question', { csrfToken: req.csrfToken(), question, errors, title: 'Ask Question' });
    };
}));

router.get('/', asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll();
    res.render('questions', { title: 'All Questions', questions });
}))

module.exports = router;
