const express= require('express');
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();
const { requireAuth } = require("../auth");


router.get('/answers/:id(\\d+)',asyncHandler(async(req,res)=>{
    const answerId= parseInt(req.params.id, 10);
    const answer= await db.Answer.findByPk(answerId,{include : [{model:db.Users},{model: db.Question}]})
    res.render('answer',{title: 'Answer',answer});
}));

const answerValidator = [
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a valid answer"),
];

router.get('/questions/:questionId(\\d+)/answers',csrfProtection,
  asyncHandler(async(req,res)=>{
      const questionId = req.params.questionId;
      const question=await db.Question.findByPk(questionId);
      const answer=db.Answer.build();
      res.render('answer',{
          title : 'Add Answer',
          question,
          answer,
          csrfToken: req.csrfToken(),
      })
  }))


  router.post(
    "/",
    requireAuth,
    csrfProtection,
    answerValidator,
    asyncHandler(async (req, res) => {
      const { content, userId, questionId, answerScore } = req.body;
      const answer = await db.Answer.build({
        content,
        userId,
        questionId,
        answerScore,
      });

      const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {
        await answer.save();
        res.redirect(`/questions/${questionId}`);
      } else {
        const question = await db.Question.findByPk(questionId, {
          include: db.User,
        });
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render("bad-answer", {
          answer,
          question,
          errors,
          csrfToken: req.csrfToken(),
        });
      }
    })
  );

  


  module.exports = router;
