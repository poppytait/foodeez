const express = require('express');
const router = express.Router();
const Order = require('../models/order');

/* GET home page. */
router.get('/', (req, res, next) => {
  Order.find({ userId: req.session.currentUser })
    .then((result) => {
      console.log(result);
      res.render('order/orderlist', { orders: result });
    })
    .catch(next);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((result) => {
      res.render('order/order-details', { order: result });
    })
    .catch(next);
});
router.get('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((result) => {
      res.render('order/order-edit', { order: result });
    })
    .catch(next);
});

router.post('/:id/edit', (req, res, next) => {
  const id = req.params.id;
  const {
    addressLine1,
    addressLine2,
    city,
    postcode,
    phoneNumber,
    undesiredFoodType,
    allergies,
    dietaryRequirements,
    budget,
    numberOfFoodeez
  } = req.body;
  Order.findByIdAndUpdate(id, { $set: {
    address: {
      addressLine1,
      addressLine2,
      city,
      postcode
    },
    phoneNumber,
    undesiredFoodType,
    allergies,
    dietaryRequirements,
    budget,
    numberOfFoodeez } })
    .then(() => {
      res.redirect('/orderlist');
    })
    .catch(next);
});

module.exports = router;
