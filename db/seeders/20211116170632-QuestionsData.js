'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Questions",
      [
        {
          title: "How long should a nap last?",
          content:
            "How long should my nap last? Should I nap for 30 minutes? 2 hours? 2 days? So many options!",
          userId: 1,
          createdAt: new Date("Wed, 27 July 2016 13:30:00"),
          updatedAt: new Date("Wed, 27 July 2016 13:30:00"),
        },
        {
          title: "Where should I nap?",
          content:
            "There's a lot of places I could nap. Should I nap in my room, on my porch, in front of my computer during class? Should I just do all of them?",
          userId: 1,
          createdAt: new Date("Mon, 4 February 2019 13:30:00"),
          updatedAt: new Date("Mon, 4 February 2019 13:30:00"),
        },
        {
          title: "What is the best way to nap at a desk?",
          content:
            "I love taking naps at work, but my desk is so uncomfortable! How can I get more comfortable so I can do more napping on the job?",
          userId: 1,
          createdAt: new Date("Fri, 12 November 2021 13:30:00"),
          updatedAt: new Date("Fri, 12 November 2021 13:30:00"),
        },
        {
          title: "What are the benefits of napping?",
          content:
            "I enjoy the occasional nap, but I don't know much about their health benefits. Will I feel less sad if I nap every day?",
          userId: 1,
          createdAt: new Date("Tue, 16 November 2021 11:05:00"),
          updatedAt: new Date("Tue, 16 November 2021 11:05:00"),
        },
        {
          title: "At what point does napping just become sleeping?",
          content:
            "If I take a nap but I accidentally wake up 6 hours later, did I just sleep? Is this no longer a nap? Have I failed?",
          userId: 1,
          createdAt: new Date("Wed, 17 November 2021 05:40:07"),
          updatedAt: new Date("Wed, 17 November 2021 05:40:07"),
        },
        {
          title: "Is napping a good workout?",
          content:
            "Can I get a nice body by napping every day? Asking for a friend.",
          userId: 1,
          createdAt: new Date("Wed, 17 November 2021 02:30:00"),
          updatedAt: new Date("Wed, 17 November 2021 02:30:00"),
        },
      ],
      {}
    );

  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Questions', null, {});
  }
};
