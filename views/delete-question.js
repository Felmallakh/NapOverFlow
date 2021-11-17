const { Question } = require('../db/models');

document.addEventListener('DOMContentLoaded', (async (e) => {
    const url = window.location.href;
    console.log(url);
    const brokenUrl = url.split('/');
    const questionId = brokenUrl[brokenUrl.length - 1];
    const question = await Question.findByPk(questionId);

    const deleteQuestion = document.querySelector(`.question-${questionId}`);

    deleteQuestion.addEventListener('click', (async (event) => {
        await question.destroy();
        window.location.href = "http://nap-overflow.herokuapp.com/questions";
    }));
}));
