'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const authMiddleware = require('../middlewares/authMiddleware');
const formMiddleware = require('../middlewares/formMiddleware');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET sign up page */
router.get('/signup', authMiddleware.requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('message-name')
  };
  res.render('auth/signup', data);
});

/* POST sign up page */
router.post('/signup', authMiddleware.requireAnon, formMiddleware.requireFields, formMiddleware.isValidEmail, formMiddleware.isPasswordOver6Characters, (req, res, next) => {
  const { email, password } = req.body;
  const isCustomer = true;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        req.flash('message-name', 'Email already used'); // Email already used
        return res.redirect('/auth/signup');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({
        email,
        password: hashedPassword,
        isCustomer
      })
        .then((newUser) => {
          req.session.currentUser = newUser;
          res.redirect('/order');
        })
        .catch(next);
    })
    .catch(next);
});

/* GET log in page. */
router.get('/login', authMiddleware.requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('message-name')
  };
  res.render('auth/login', data);
});

/* POST log in page */
router.post('/login', authMiddleware.requireAnon, formMiddleware.requireFields, formMiddleware.isValidEmail, formMiddleware.isPasswordOver6Characters, (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash('message-name', 'Email not registered'); // Email not registered
        return res.redirect('/auth/login');
      }
      if (bcrypt.compareSync(password, user.password) && !user.isCustomer) {
        req.session.currentUser = user;
        res.redirect('/orderlist');
      } else if (bcrypt.compareSync(password, user.password) && user.isCustomer) {
        req.session.currentUser = user;
        res.redirect('/order');
      } else {
        req.flash('message-name', 'Email or password is not correct'); // Email or password is not correct
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

/* POST log out */
router.post('/logout', authMiddleware.requireUser, (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/');
});

/* GET restaurant sign up page */
router.get('/restaurantSignup', authMiddleware.requireAnon, (req, res, next) => {
  const data = {
    messages: req.flash('message-name')
  };
  res.render('auth/restaurantSignup', data);
});

/* POST restaurant sign up page */
router.post('/restaurantSignup', authMiddleware.requireAnon, formMiddleware.requireFields, formMiddleware.isValidEmail, formMiddleware.isPasswordOver6Characters, (req, res, next) => {
  const { restaurantName, foodType, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        req.flash('message-name', 'Email already used');
        return res.redirect('/auth/login');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({
        email,
        password: hashedPassword,
        isCustomer: false
      })
        .then((newUser) => {
          req.session.currentUser = newUser;
          Restaurant.create({
            restaurantName,
            foodType,
            ownerId: newUser._id
          });
        })
        .then(() => {
          res.redirect('/orderlist');
        })
        .catch(next);
    });
});

module.exports = router;
