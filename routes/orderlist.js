const express = require('express');
const router = express.Router();
const Order = require('../models/order');
const Restaurant = require('../models/restaurant');
const formMiddleware = require('../middlewares/formMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

/* GET orderlist page. */
router.get('/', authMiddleware.requireUser, (req, res, next) => {
  if (req.session.currentUser.isCustomer) {
    Order.find({ userId: req.session.currentUser._id })
      .populate('userId')
      .then((result) => {
        res.render('order/orderlist', { orders: result });
      })
      .catch(next);
  } else {
    Restaurant.find({ ownerId: req.session.currentUser._id })
      .then((result) => {
        Order.find({ restaurantId: result[0]._id })
          .then((results) => {
            res.render('order/orderlist', { orders: results });
          })
          .catch(next);
      })
      .catch(next);
  }
});

router.get('/:id', authMiddleware.requireUser, (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((result) => {
      res.render('order/order-details', { order: result });
    })
    .catch(next);
});

router.get('/:id/edit', authMiddleware.requireUser, (req, res, next) => {
  const id = req.params.id;
  const data = {
    messages: req.flash('message-name')
  };
  Order.findById(id)
    .then((result) => {
      data.order = result;
      res.render('order/order-edit', data);
    })
    .catch(next);
});

router.post('/:id/edit', authMiddleware.requireUser, formMiddleware.requireFields, (req, res, next) => {
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
    .then((result) => {
      res.redirect('/orderlist');
    })
    .catch(next);
});

/* GET view order page (restaurant user) */
router.get('/:id/view', authMiddleware.requireUser, (req, res, next) => {
  const id = req.params.id;
  Order.findById(id)
    .then((result) => {
      res.render('order/order-details', { order: result });
    })
    .catch(next);
});

router.post('/:id/delete', authMiddleware.requireUser, (req, res, next) => {
  const id = req.params.id;
  Order.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/orderlist');
    })
    .catch(next);
});

// accepting order
router.post('/:id/accept', authMiddleware.requireUser, (req, res, next) => {
  const id = req.params.id;
  const { price } = req.body;
  Order.findByIdAndUpdate(id, { $set: {
    willServe: true,
    isProccessing: false,
    price: price
  }
  })
    .then(() => {
      res.redirect('/orderlist');
    })
    .catch(next);
});

// rejecting order
// accepting order
router.post('/:id/reject', authMiddleware.requireUser, (req, res, next) => {
  const id = req.params.id;
  Order.findByIdAndUpdate(id, { $set: {
    willServe: false,
    isProccessing: false
  }
  })
    .then(() => {
      res.redirect('/orderlist');
    })
    .catch(next);
});

router.post('/:id/close', authMiddleware.requireUser, (req, res, next) => {
  const id = req.params.id;
  Order.findByIdAndUpdate(id, { $set: {
    isCompleted: true
  }
  })
    .then(() => {
      res.redirect('/orderlist');
    })
    .catch(next);
});
module.exports = router;
