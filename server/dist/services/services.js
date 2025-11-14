"use strict";

function generateOrderId() {
  var now = Date.now();
  var random = Math.floor(Math.random() * 10000);
  return "ORD".concat(now).concat(random);
}
module.exports = {
  generateOrderId: generateOrderId
};