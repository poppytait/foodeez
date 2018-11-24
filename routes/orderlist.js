const express = require('express');
const router = express.Router();

/* GET order list */
router.get('/', (req, res, next) => {
  res.render('order/orderlist', { title: 'Order List' });
});

module.exports = router;
