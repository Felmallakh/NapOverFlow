const express = require('express');
const { check, validationResult } = require('express-validator');
const { TooManyRequests } = require('http-errors');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router(); 

const increaseScore = async (answer) => {
  let currentScore = answer.dataValues.score;
  const newScore = currentScore + 1;
  return await answer.update({ score: newScore });
};

const decreaseScore = async (answer) => {
  let currentScore = answer.dataValues.score;
  const newScore = currentScore - 1;
  return await answer.update({ score: newScore });
};

router.get('/answers/:id(\\d+)', asyncHandler(async (req, res) => {
  const answerId = parseInt(req.params.id, 10);
  const answer = await db.Answer.findByPk(answerId, { include: [{ model: db.Users }, { model: db.Question }] })
  res.render('answer', { title: 'Answer', answer });
}));

const answerValidators = [
  check('content')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Content')
    .isLength({ max: 1000 })
    .withMessage('Contents must not be more than 1000 characters more')
];

router.get('/questions/:questionId(\\d+)/answers',
  asyncHandler(async (req, res) => {
    const questionId = req.params.questionId;
    const question = await db.Question.findByPk(questionId);
    // const answer = db.Answer.build();
    res.render('answer', {
      title: 'Add Answer',
      question,
      answer,
      csrfToken: req.csrfToken(),
    })
  }))


router.post("/questions/:id/answers",
  csrfProtection,
  answerValidators,
  asyncHandler(async (req, res) => {
    const questionId = req.params.id;
    const userId = res.locals.user.id;
    const scoreT = await db.ScoringAnswer.create();
    const { answerContents } = req.body;

    const answer = await db.Answer.build({
      content: answerContents,
      userId,
      questionId,
      score: 0
    });
    await answer.save();
    res.redirect(`/questions/${questionId}`);
  })
);

router.get('/answer/edit/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answer = await db.Answer.findByPk(answerId, { include: ['question'] });
    res.render('answer-edit', {
      title: 'Edit Answer',
      question: answer.question,
      answer,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/answer/edit/:id(\\d+)', csrfProtection, answerValidators,
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answerToUpdate = await db.Answer.findByPk(answerId, { include: ['question'] });

    const {
      content
    } = req.body;

    const answer = {
      content
    };

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      await answerToUpdate.update(answer);
      res.redirect(`/answer/${answerId}`);
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('answer-edit', {
        title: 'Edit Answer',
        question: answerToUpdate.question,
        answer: { ...answer, id: answerId },
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  }));


router.delete("/answers/:id", asyncHandler(async (req, res) => {
  const answerId = req.params.id;
  const answer = await db.Answer.findByPk(answerId);
  const scoreAnswer = await db.ScoringAnswer.findAll({ where: { answerId } });

  if (scoreAnswer) {
    scoreAnswer.forEach((async (score) => {
      await score.destroy();
    }));
  };
  await answer.destroy();

  res.json({ message: "Success" })
}));

router.post("/answers/:id/upvote", asyncHandler(async (req, res) => {
  const answerId = req.params.id;
  const userId = res.locals.user.id;

  const scoringAnswer = await db.ScoringAnswer.findOne({
    where: { userId, answerId }
  });

  const answer = await db.Answer.findByPk(answerId);

  if (!scoringAnswer) {
    const newScoringAnswer = await db.ScoringAnswer.create({
      vote: true, answerId, userId
    });
    // make new score and upvote
    await increaseScore(answer);
    res.json({ message: "upvote" });
  } else if (scoringAnswer.vote === false && scoringAnswer.userId === userId) {
    await scoringAnswer.destroy();
    // take previous score and upvote once
    await increaseScore(answer);
    res.json({ message: "upvote-reset" });
  } else if (scoringAnswer.vote === true && scoringAnswer.userId === userId) {
    await scoringAnswer.destroy();
    // take previous score and downvote once
    await decreaseScore(answer);
    res.json({ message: "downvote" });
  }
}));

router.post("/answers/:id/downvote", asyncHandler(async (req, res) => {
  const answerId = req.params.id;
  const userId = res.locals.user.id;

  const scoringAnswer = await db.ScoringAnswer.findOne({
    where: { userId, answerId }
  });

  const answer = await db.Answer.findByPk(answerId);

  if (!scoringAnswer) {
    const newScoringAnswer = await db.ScoringAnswer.create({
      vote: false, answerId, userId
    });
    // make new score and downvote
    await decreaseScore(answer);
    res.json({ message: "downvote" });
  } else if (scoringAnswer.vote === true && scoringAnswer.userId === userId) {
    await scoringAnswer.destroy();
    // take previous score and downvote once
    await decreaseScore(answer);
    res.json({ message: "downvote-reset" });
  } else if (scoringAnswer.vote === false && scoringAnswer.userId === userId) {
    await scoringAnswer.destroy();
    // take previous score and upvote once
    await increaseScore(answer);
    res.json({ message: "upvote" });
  }
}));


// identify answer
// take info send request to back-end
// route handler
// take in request from fetch call -> INSIDE route handler,
// determine status of how the user interacts with the score
// query db -> look for record that matches userId and answerId
// if no record, make new record
// else update/delete record
// send response to front that will tell us what happened
// DOM manipulation to determine what to do based on action taken through back
module.exports = router;
