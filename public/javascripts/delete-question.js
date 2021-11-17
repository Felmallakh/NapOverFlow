const { Question } = require('../../db/models');

document.addEventListener('DOMContentLoaded', (e) => {
    const url = window.location.href;
    console.log(url);
    const brokenUrl = url.split('/');
    const questionId = brokenUrl[brokenUrl.length - 1];
    const deleteQuestion = document.querySelector(`.question-${questionId}`);

    deleteQuestion.addEventListener('click', (async (event) => {
        // send fetch request
        // const question = await Question.findByPk(questionId);

        const ptag = document.createElement('p');
        ptag.innerText = 'Are you sure?';
        const divEle = document.querySelector('#question');
        divEle.appendChild(ptag);


        // await question.destroy();
        // window.location.href = "http://nap-overflow.herokuapp.com/questions";
    }));
});
