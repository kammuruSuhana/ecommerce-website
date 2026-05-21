const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  userId: String,
  products: Array,
  totalAmount: Number,
  address: String,
  paymentStatus: {
    type: String,
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    default: 'Packed'
  }
});

module.exports = mongoose.model('Order', OrderSchema);