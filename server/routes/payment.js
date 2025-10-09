const express = require('express');
const { getUrlPayment, vnpayReturn } = require('../controllers/payment');
const {verifyLogin} = require('../midlewares/verify');

const router = express.Router();

router.use(verifyLogin);
router.post("/create-payment-url", getUrlPayment);
router.get("/vnpay_return", vnpayReturn);
module.exports = router;