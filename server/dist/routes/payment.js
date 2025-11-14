"use strict";

var express = require('express');
var _require = require('../controllers/payment'),
  getUrlPayment = _require.getUrlPayment,
  vnpayReturn = _require.vnpayReturn;
var _require2 = require('../midlewares/verify'),
  verifyLogin = _require2.verifyLogin;
var router = express.Router();
router.use(verifyLogin);
router.post("/create-payment-url", getUrlPayment);
router.get("/vnpay_return", vnpayReturn);
module.exports = router;