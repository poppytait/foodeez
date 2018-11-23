'use strict';

const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const authMiddleware = require('../middlewares/authMiddleware');
// const formMiddleware = require('../middlewares/formMiddleware');

/* GET order page. */
router.get('/', authMiddleware.requireForOrder, (req, res, next) => {
  res.render('order/order', { title: 'Order' });
});

/* POST order page */
router.post('/', authMiddleware.requireForOrder, (req, res, next) => {
  const { addressLine1, addressLine2, city, postcode, phoneNumber, undesiredFoodType, allergies, dietaryRequirements, budget, numberOfFoodeez } = req.body;
  Order.create(req.body)
    .then(() => {
      res.redirect('/'); // Redirect to home by now
    })
    .catch(next);
});

/* GET tracking delivery page. */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((result) => {
      res.render('order/tracking-order', { title: 'Order' });
    })
    .catch(next);
});

module.exports = router;
