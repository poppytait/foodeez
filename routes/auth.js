var express = require('express');
var router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');
const formMiddleware = require('../middlewares/formMiddleware');

const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET sign in page */
router.get('/signup', authMiddleware.requireAnon, (req, res, next) => {
  res.render('auth/signup', { title: 'Sign Up' });
});

/* POST sign in page */
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
        res.redirect('/');
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

module.exports = router;
