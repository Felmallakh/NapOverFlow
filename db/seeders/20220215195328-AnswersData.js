'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkInsert('Answers', [
        {
          content:
            "Nap for as long as you can, when you can. If you haven't slept enough you'll definitely feel it.",
          userId: 2,
          questionId: 1,
          score: 5,
          createdAt: new Date("Thu, 28 July 2016 13:30:00"),
          updatedAt: new Date("Thu, 28 July 2016 13:30:00")
        },
        {
          content:
            "Just sleep, 4head.",
          userId: 3,
          questionId: 1,
          score: 10,
          createdAt: new Date("Thu, 28 July 2016 12:30:00"),
          updatedAt: new Date("Thu, 28 July 2016 12:30:00")
        },
        {
          content:
            "Sometimes getting in a nap when you need to can be tough. Take an early day to catch up on sleep overnight if you need to.",
          userId: 4,
          questionId: 1,
          score: 7,
          createdAt: new Date("Thu, 28 July 2016 14:30:00"),
          updatedAt: new Date("Thu, 28 July 2016 14:30:00")
        },
        {
          content:
            "It's possible to just get KO'd by your exhaustion but it isn't that big of a deal. If you have a choice, sleep in your bed.",
          userId: 2,
          questionId: 2,
          score: 10,
          createdAt: new Date("Tue, 5 February 2019 12:30:00"),
          updatedAt: new Date("Tue, 5 February 2019 12:30:00")
        },
        {
          content:
            "Just sleep, 4head.",
          userId: 3,
          questionId: 2,
          score: -5,
          createdAt: new Date("Tue, 5 February 2019 13:30:00"),
          updatedAt: new Date("Tue, 5 February 2019 13:30:00")
        },
        {
          content:
            "Sleep wherever you want, because apparently the experts say the position in which you sleep does not matter.",
          userId: 4,
          questionId: 2,
          score: 6,
          createdAt: new Date("Tue, 5 February 2019 14:30:00"),
          updatedAt: new Date("Tue, 5 February 2019 14:30:00")
        },
        {
          content:
            "You're a funny one. This is your boss, let's talk more about this in my office.",
          userId: 2,
          questionId: 3,
          score: 100,
          createdAt: new Date("Sat, 13 November 2021 13:30:00"),
          updatedAt: new Date("Sat, 13 November 2021 13:30:00")
        },
        {
          content:
            "Uh oh, you're in trouble now.",
          userId: 3,
          questionId: 3,
          score: 17,
          createdAt: new Date("Sat, 13 November 2021 14:30:00"),
          updatedAt: new Date("Sat, 13 November 2021 14:30:00")
        },
        {
          content:
            "Get a pillow that you can hide in your desk cabinet somewhere.",
          userId: 4,
          questionId: 3,
          score: 8,
          createdAt: new Date("Sat, 13 November 2021 15:30:00"),
          updatedAt: new Date("Sat, 13 November 2021 15:30:00")
        },
        {
          content:
            "When you don't get enough sleep, all aspects of your daily life are impacted. Get more sleep!",
          userId: 2,
          questionId: 4,
          score: 11,
          createdAt: new Date("Wed, 17 November 2021 12:05:00"),
          updatedAt: new Date("Wed, 17 November 2021 12:05:00")
        },
        {
          content:
            "Taking a nap definitely helps, I nap 24/7 so I don't have enough time to think about my mental state.",
          userId: 3,
          questionId: 4,
          score: 24,
          createdAt: new Date("Wed, 17 November 2021 13:05:00"),
          updatedAt: new Date("Wed, 17 November 2021 13:05:00")
        },
        {
          content:
            "If you feel a little sad, napping definitely helps.",
          userId: 4,
          questionId: 4,
          score: 93,
          createdAt: new Date("Wed, 17 November 2021 14:05:00"),
          updatedAt: new Date("Wed, 17 November 2021 14:05:00")
        },
        {
          content:
            "Sounds like a successful nap to me.",
          userId: 2,
          questionId: 5,
          score: 1000,
          createdAt: new Date("Thu, 18 November 2021 06:40:00"),
          updatedAt: new Date("Thu, 18 November 2021 06:40:00")
        },
        {
          content:
            "How is that even possible?",
          userId: 3,
          questionId: 5,
          score: -8,
          createdAt: new Date("Thu, 18 November 2021 07:40:00"),
          updatedAt: new Date("Thu, 18 November 2021 07:40:00")
        },
        {
          content:
            "What performance enhancing drug do you use to achieve such a feat?",
          userId: 4,
          questionId: 5,
          score: 15,
          createdAt: new Date("Thu, 18 November 2021 08:40:00"),
          updatedAt: new Date("Thu, 18 November 2021 08:40:00")
        },
        {
          content:
            "Apparently, the better sleep you get the less cravings you have.",
          userId: 2,
          questionId: 6,
          score: 19,
          createdAt: new Date("Thu, 18 November 2021 03:30:00"),
          updatedAt: new Date("Thu, 18 November 2021 03:30:00")
        },
        {
          content:
            "Sleep more and eat less.",
          userId: 3,
          questionId: 6,
          score: 28,
          createdAt: new Date("Thu, 18 November 2021 04:30:00"),
          updatedAt: new Date("Thu, 18 November 2021 04:30:00")
        },
        {
          content:
            "6-pack incoming.",
          userId: 4,
          questionId: 6,
          score: 71,
          createdAt: new Date("Thu, 18 November 2021 05:30:00"),
          updatedAt: new Date("Thu, 18 November 2021 05:30:00")
        },
      ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
      return queryInterface.bulkDelete('Answers', null, {});
  }
};
