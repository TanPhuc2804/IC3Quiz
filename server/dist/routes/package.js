"use strict";

var express = require('express');
var _require = require('../controllers/package'),
  getAllPackage = _require.getAllPackage,
  getPackageByUser = _require.getPackageByUser;
var _require2 = require('../midlewares/verify'),
  verifyLogin = _require2.verifyLogin;
var router = express.Router();
router.get("/", getAllPackage);
router.get("/user-buy", verifyLogin, getPackageByUser);
module.exports = router;