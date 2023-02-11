const Mongoose = require('mongoose');

const OrderSchema = new Mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  paymentIndentId: {
    type: String,
    required: true
  },
  user: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Order = Mongoose.model('order', OrderSchema);

module.exports = Order