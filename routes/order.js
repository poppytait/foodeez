'use strict';

const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Restaurant = require('../models/restaurant');
const authMiddleware = require('../middlewares/authMiddleware');
const formMiddleware = require('../middlewares/formMiddleware');
const ObjectId = require('mongoose').Types.ObjectId;

/* GET order page. */
router.get('/', authMiddleware.requireUser, (req, res, next) => {
  const data = {
    messages: req.flash('message-name'),
    user: req.session.currentUser
  };
  res.render('order/order', data);
});

/* POST order page */
router.post('/new', authMiddleware.requireUser, formMiddleware.requireFields, (req, res, next) => {
  const timestamp = new Date();
  const userId = req.session.currentUser;
  const willServe = null;
  const isCompleted = null;
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
    numberOfFoodeez,
    willServe,
    isCompleted })
    .then(orderResult => {
      const orderId = orderResult._id;
      Restaurant.find({ foodType: { $nin: orderResult.undesiredFoodType } })
        .then((restaurantResult) => {
          if (restaurantResult.length !== 0) {
            const randomRestaurant = Math.floor(Math.random() * restaurantResult.length); // Gets a random restaurant that does not have foodType from undesiredFoodType
            Order.findByIdAndUpdate(orderId, { $set: { restaurantId: ObjectId(restaurantResult[randomRestaurant]._id) } })
              .then((result) => {
                res.redirect('/order/' + result._id); // Redirect to /order/:order_id
              })
              .catch(next);
          } else {
            res.redirect('/order/norestaurantsfound');
          }
        })
        .catch(next);
    })
    .catch(next);
});

/* GET no restaurants found page. */
router.get('/norestaurantsfound', authMiddleware.requireUser, (req, res, next) => {
  res.render('order/order-norestaurantsfound');
});

/* GET order-processed page. */
router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((result) => {
      if (result.willServe === false) {
        console.log('false');
        res.render('order/order-rejected', { order: result });
      } else if (result.willServe === true) {
        res.render('order/order-completed', { order: result });
      } else if (result.willServe === null) {
        res.render('order/order-processed', { order: result });
      }
    })
    .catch(next);
});

router.get('/:id/json', (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

module.exports = router;
