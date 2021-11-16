const express = require('express');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { asyncHandler , csrfProtection } = require("./utils")

const { User } = require('../db/models/');
const { loginUser } = require('../auth');


const router = express.Router();

// async function to hash the password given through the sign-up page
async function hashPassword(password) {
    const hash = await bcrypt.hash(password, 12); // hash the password with 12 salt rounds
    return hash;
};

// validators for user creation
const userValidators = [
    // check the display name...if empty or more than 50 characters, display error accordingly
    check('displayName')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Display Name')
        .isLength({ max: 50 })
        .withMessage('Display Name must not be more than 50 characters long'),
    // check the email...if empty OR more than 255 characters OR not a valid email OR email already in use, display error accordingly
    check('email')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a value for Email')
        .isLength({ max: 255 })
        .withMessage('Email must not be more than 255 characters long')
        .isEmail()
        .withMessage('Email provided is not a valid email address')
        .custom(value => {
            return User.findOne({
                where: { email: value }
            })
                .then(user => {
                    if (user) {
                        return Promise.reject('The provided email is already in use by another account')
                    }
                });
        }),
    // check the password...if empty display an error --> ADDITIONAL MAYBE? custom characters required
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password')
];

router.get('/', csrfProtection, (req, res) => {
    res.render('sign-up', { csrfToken: req.csrfToken(), title: 'Sign-Up', create: {} });
});

router.post('/', csrfProtection, userValidators, asyncHandler(async (req, res) => {
    const { displayName, email, password } = req.body;

    const newUser = User.build({ displayName, email });

    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
        const hashedPassword = hashPassword(password);
        newUser.hashedPassword = hashedPassword;
        await newUser.save();
        loginUser(req, res, newUser);
        res.redirect('/');
    } else {
        const errors = validatorErrors.array().map(error => error.msg);
        res.render('sign-up', {
            title: 'Sign-Up', create: newUser, errors, csrfToken: req.csrfToken(),
        });
    }
}));

module.exports = router;
