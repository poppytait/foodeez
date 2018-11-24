const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

/* GET home page. */
router.get('/', authMiddleware.requireForOrder, (req, res, next) => {
  res.render('order/order', { title: 'Order' });
});

module.exports = router;
