const upvoteButton = document.querySelectorAll(".upvote");
const downvoteButton = document.querySelectorAll(".downvote");

for (let button of upvoteButton) {
    button.addEventListener('click', (async (e) => {
        e.preventDefault();
        const answerId = e.target.id;
        const res = await fetch(`/answers/${answerId}/upvote`, {
            method: "POST"
        })

        const data = await res.json();

        const message = data.message;

        const scoreClass = document.querySelector(`.score-${answerId}`);
        let score = parseInt(scoreClass.innerText, 10);
        if (message === "upvote") {
            button.classList.add("make-button-green");
            score += 1;
            scoreClass.innerText = `${score}`;
        } else if (message === "downvote") {
            button.classList.remove("make-button-green");
            score -= 1;
            scoreClass.innerText = `${score}`;
        } else if (message === "upvote-reset") {
            const otherButton = document.querySelector(".downvote.make-button-red");
            otherButton.classList.remove("make-button-red");
            score += 1;
            scoreClass.innerText = `${score}`;
        }
    }));
};

for (let button of downvoteButton) {
    button.addEventListener('click', (async (e) => {
        e.preventDefault();
        const answerId = e.target.id;
        const res = await fetch(`/answers/${answerId}/downvote`, {
            method: "POST"
        })

        const data = await res.json();

        const message = data.message;

        const scoreClass = document.querySelector(`.score-${answerId}`);
        let score = parseInt(scoreClass.innerText, 10);
        if (message === "upvote") {
            button.classList.remove("make-button-red");
            score += 1;
            scoreClass.innerText = `${score}`;
        } else if (message === "downvote") {
            button.classList.add("make-button-red");
            score -= 1;
            scoreClass.innerText = `${score}`;
        } else if (message === "downvote-reset") {
            const otherButton = document.querySelector(".upvote.make-button-green");
            otherButton.classList.remove("make-button-green");
            score -= 1;
            scoreClass.innerText = `${score}`;
        }
    }));
};
