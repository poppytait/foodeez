'use strict';

const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const Order = require('../models/order');
const authMiddleware = require('../middlewares/authMiddleware');
// const formMiddleware = require('../middlewares/formMiddleware');

/* GET order page. */
router.get('/', authMiddleware.requireUser, (req, res, next) => {
  const userId = req.session.currentUser;
  const timestamp = new Date();
  Order.create({ userId, timestamp })
    .then(result => {
      res.render('order/order', { order: 'Order' });
    })
    .catch(next);
});

/* POST order page */
router.post('/', authMiddleware.requireUser, (req, res, next) => {
  const { addressLine1, addressLine2, city, postcode, phoneNumber, undesiredFoodType, allergies, dietaryRequirements, budget, numberOfFoodeez } = req.body;
  Order.find({ userId: req.session.currentUser }, { timestamp: 1 })
    .then((result) => {
      console.log(result);
      Order.findOneAndUpdate(result._id, { $set: req.body })
        .then(() => {
          res.redirect('/'); // Redirect to home by now
        })
        .catch(next);
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
