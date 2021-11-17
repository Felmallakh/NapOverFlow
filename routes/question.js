const express = require('express');
const router = express.Router();



const { check, validationResult } = require('express-validator');
const { asyncHandler, csrfProtection } = require("./utils");
const { Question, User } = require('../db/models');
const { requireAuth } = require('../auth');


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

router.get('/', asyncHandler(async (req, res, next) => {
    const questions = await Question.findAll({ include: User });
    res.render('questions-list', { title: 'All Questions', questions });
}))

router.post('/', requireAuth, questionValidator, csrfProtection, asyncHandler(async (req, res) => {

    const { title, content } = req.body;
    const userId = res.locals.user.id;
    const question = await Question.build({
        title, content, userId
    });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        await question.save();
        res.redirect(`/questions/${question.id}`);
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('new-question', { csrfToken: req.csrfToken(), question, errors, title: 'Ask Question' });
    };
}));


router.get("/:id(\\d+)", csrfProtection, async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId, { include: User });

    res.render("question", { question, csrfToken: req.csrfToken() });
});

router.put("/:id", questionValidator, requireAuth, csrfProtection, asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId, { include: User });
    const { title, content } = req.body;

    if (validatorErrors.isEmpty()) {
        await question.update({ title, content })
        res.redirect(`/questions/${questionId}`);
    } else {
        const errors = validatorErrors.array().map((err) => err.msg);
        res.render("question", { errors, question, csrfToken: req.csrfToken() })
    }
}))

router.delete("/:id", asyncHandler(async (req, res) => {
    const questionId = parseInt(req.params.id, 10);
    const question = await Question.findByPk(questionId);

    await question.destroy();
    res.send();
}))



module.exports = router;
