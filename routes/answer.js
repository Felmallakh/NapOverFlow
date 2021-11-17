const express= require('express');
const { check, validationResult } = require('express-validator');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');

const router = express.Router();


router.get('/answer/:id(\\d+)',asyncHandler(async(req,res)=>{
    const answerId= parseInt(req.params.id, 10);
    const answer= await db.Answer.findByPk(answerId,{include : [{model:db.Users},{model: db.Question}]})
    res.render('answer',{title: 'Answer',answer});
}));

const answerValidators=[
    check('content')
    .exists({ checkFalsy : true})
    .withMessage('Please provide a value for Content')
    .isLength({max: 1000})
    .withMessage('Contents must not be more than 1000 characters more')
];

router.get('/question/:questionId(\\d+)/answer/add',csrfProtection,
  asyncHandler(async(req,res)=>{
      const questionId = parseInt(req.params.questionId, 10);
      const question=await db.Question.findByPk(questionId);
      const answer=db.Answer.build();
      res.render('answer-add',{
          title : 'Add Answer',
          question,
          answer,
          csrfToken: req.csrfToken(),
      })
  }))


router.post('/question/:questonId(\\d+)/answer/add',csrfProtection,answerValidators,
  asyncHandler(async(req,res)=>{
    const questionId = parseInt(req.params.questionId, 10);
    const question=await db.Question.findByPk(questionId);

    const{
        content
    }=req.body;

    const answer=db.Answer.build({
        content,
        userId,
        questionId,
        scoreId,
    });
    const validatorErrors=validationResult(req);

    if (validatorErrors.isEmpty()) {
        await answer.save();
        res.redirect(`/question/${questionId}`);
      } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('answer-add', {
          title: 'Add Answer',
          question,
          answer,
          errors,
          csrfToken: req.csrfToken(),
        });
      }

  }));

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

  router.get('/answer/delete/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answer= await db.Answer.findByPk(answerId, { include: ['question'] });
    res.render('answer-delete', {
      title: 'Delete Answer',
      answer,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/answer/delete/:id(\\d+)', csrfProtection,
  asyncHandler(async (req, res) => {
    const answerId = parseInt(req.params.id, 10);
    const answer = await db.Answer.findByPk(answerId);
    await answer.destroy();
    res.redirect(`/question/${answer.questionId}`);
  }));


  module.exports = router;
