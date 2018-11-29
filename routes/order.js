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
router.get('/:id', authMiddleware.requireUser, (req, res, next) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return next();
  }
  // console.log(req.session.currentUser);
  Order.findById(id)
    .then((result) => {
      if (result === null) {
        return next(); // Protecting for typing orderIds that don't exist
      } else if (!result.userId.equals(req.session.currentUser._id)) {
        return next(); // Protecting route for other users
      } else if (result.willServe === null) {
        res.render('order/order-processed', { order: result });
      }
    })
    .catch(next);
});

router.get('/:id/json', authMiddleware.requireUser, (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

router.get('/:id/restaurants', authMiddleware.requireUser, (req, res, next) => {
  Restaurant.find()
    .then(restaurants => res.json(restaurants))
    .catch(next);
});

module.exports = router;
