const express = require('express');
const router = express.Router();
const Order = require('../models/order');

/* GET home page. */
router.get('/', function (req, res, next) {
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

module.exports = router;
