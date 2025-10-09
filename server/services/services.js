function generateOrderId() {
  const now = Date.now(); 
  const random = Math.floor(Math.random() * 10000);
  return `ORD${now}${random}`;
}
module.exports = { generateOrderId };