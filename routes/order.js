'use strict';

const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Order = require('../models/order');
const authMiddleware = require('../middlewares/authMiddleware');
// const formMiddleware = require('../middlewares/formMiddleware');

/* GET order page. */
router.get('/', authMiddleware.requireUser, (req, res, next) => {
  const userId = req.session.currentUser._id;
  const timestamp = new Date();
  Order.create({ userId, timestamp })
    .then(result => {
      console.log(result);
      res.render('order/order', { order: result });
    })
    .catch(next);
});

/* POST order page */

router.post('/', authMiddleware.requireUser, (req, res, next) => {
  const { addressLine1, addressLine2, city, postcode, phoneNumber, undesiredFoodType, allergies, dietaryRequirements, budget, numberOfFoodeez } = req.body;
  const user = User.findById(currentUser._id);
  console.log(user);
  const lastOrder = Order.find().sort({ timestamp: 1, userId: user });
  // console.log(lastOrder._id);
  Order.findByIdAndUpdate(lastOrder._id, { $set: req.body })
    .then(() => {
      res.redirect('/order/:id'); // Redirect to home by now
    })
    .catch(next);
});

/* GET tracking delivery page. */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((result) => {
      res.render('order/tracking-order', { order: result });
    })
    .catch(next);
});

module.exports = router;
