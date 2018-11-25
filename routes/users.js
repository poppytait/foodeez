var express = require('express');
var router = express.Router();
const User = require('../models/user');
const authMiddleware = require('../middlewares/authMiddleware');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/profile', (req, res, next) => {
  const data = {
    messages: req.flash('message-name')
  };
  res.render('users/profile', data);
});

router.post('/profile', authMiddleware.requireUser, (req, res, next) => {
  const { addressLine1, addressLine2, city, postcode, phoneNumber } = req.body;
  const email = req.session.currentUser.email;

  User.findOneAndUpdate({ email: email }, { address: { addressLine1: addressLine1, addressLine2: addressLine2, city: city, postcode: postcode } })
    .then(() => {
      req.flash('message-name', 'Your changes have been updated');
    })
    .catch(next);
});

module.exports = router;
