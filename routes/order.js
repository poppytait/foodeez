
'use strict';

const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Restaurant = require('../models/restaurant');
const authMiddleware = require('../middlewares/authMiddleware');
// const formMiddleware = require('../middlewares/formMiddleware');
const ObjectId = require('mongoose').Types.ObjectId;

/* GET order page. */
router.get('/', authMiddleware.requireUser, (req, res, next) => {
  res.render('order/order');
});

/* POST order page */
router.post('/new', authMiddleware.requireUser, (req, res, next) => {
  const timestamp = new Date();
  const userId = req.session.currentUser;
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
  Order.create({
    timestamp,
    userId,
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
    numberOfFoodeez })
    .then(orderResult => {
      const orderId = orderResult._id;
      Restaurant.find({ foodType: { $nin: [orderResult.undesiredFoodType] } })
        .then((restaurantResult) => {
          const randomRestaurant = Math.floor(Math.random() * restaurantResult.length); // Gets a random restaurant that does not have foodType from undesiredFoodType
          Order.findByIdAndUpdate(orderId, { $set: { restaurantId: ObjectId(restaurantResult[randomRestaurant]._id) } })
            .then((result) => {
              res.redirect('/order/' + result._id); // Redirect to /order/:order_id
            })
            .catch(next);
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
