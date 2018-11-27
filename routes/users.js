var express = require('express');
var router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');
const formMiddleware = require('../middlewares/formMiddleware');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/viewProfile', (req, res, next) => {
  res.render('users/viewProfile');
});

router.get('/editProfile', (req, res, next) => {
  const user = req.session.currentUser;
  const data = {
    messages: req.flash('message-name'),
    user
  };
  res.render('users/editProfile', data);
});

router.post('/editProfile', authMiddleware.requireUser, formMiddleware.requireFields, (req, res, next) => {
  const { addressLine1, addressLine2, city, postcode, phoneNumber, allergies, dietaryRequirements } = req.body;
  const userId = req.session.currentUser._id;

  User.findByIdAndUpdate(userId, { address: { addressLine1, addressLine2, city, postcode }, phoneNumber, allergies, dietaryRequirements }, { new: true })
    .then((user) => {
      req.session.currentUser = user;
      // console.log(user);
      // req.session.currentUser
      // req.flash('message-name', 'Your changes have been updated');
      res.redirect('/users/viewProfile');
    })
    .catch(next);
});

module.exports = router;
