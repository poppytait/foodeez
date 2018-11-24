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
  res.render('auth/signup', { title: 'Sign Up' });
});

/* POST sign up page */
router.post('/signup', authMiddleware.requireAnon, formMiddleware.requireFields, (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.redirect('/auth/signup');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({
        email,
        password: hashedPassword
      })
        .then((newUser) => {
          req.session.currentUser = newUser;
          res.redirect('/');
        })
        .catch(next);
    })

    .catch(next);
});

/* GET log in page. */
router.get('/login', authMiddleware.requireAnon, (req, res, next) => {
  res.render('auth/login', { title: 'Log In' });
});

/* POST log in page */
router.post('/login', authMiddleware.requireAnon, formMiddleware.requireFields, (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.redirect('/auth/login');
      }
      if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        res.redirect('/order');
      } else {
        res.redirect('/auth/login');
      }
    })
    .catch(next);
});

/* POST log out */
router.post('/logout', authMiddleware.requireUser, (req, res, next) => {
  delete req.session.currentUser;
  res.redirect('/auth/login');
});

/* GET restaurant sign up page */
router.get('/restaurantSignup', authMiddleware.requireAnon, (req, res, next) => {
  res.render('auth/restaurantSignup', { title: 'Register' });
});

/* POST restaurant sign up page */
router.post('/restaurantSignup', authMiddleware.requireAnon, formMiddleware.requireFields, (req, res, next) => {
  const { restaurantName, foodType, email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        return res.redirect('/auth/login');
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);

      User.create({
        email,
        password: hashedPassword
      })
        .then((newUser) => {
          Restaurant.create({
            restaurantName,
            foodType,
            ownerId: newUser._id
          });
        })
        .then(() => {
          //  req.session.currentUser = newUser;
          res.redirect('/orderlist');
        })
        .catch(next);
    });
});

module.exports = router;
