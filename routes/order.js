'use strict';

const express = require('express');
const router = express.Router();
// const User = require('../models/user');
const Order = require('../models/order');
const authMiddleware = require('../middlewares/authMiddleware');
const formMiddleware = require('../middlewares/formMiddleware');

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
router.post('/', authMiddleware.requireUser, formMiddleware.requireFields, (req, res, next) => {
  const { addressLine1, addressLine2, city, postcode, phoneNumber, undesiredFoodType, allergies, dietaryRequirements, budget, numberOfFoodeez } = req.body;
  Order.findOne({ userId: req.session.currentUser }, {}, { sort: { 'timestamp': -1 } })
    .then((result) => {
      const id = result._id;
      Order.findByIdAndUpdate(id, { $set: req.body })
        .then((result) => {
          res.redirect('/order/' + result._id); // Redirect to /order/:order_id
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
