const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    required: true,
    type: String
  },
  description: {
    required: true,
    type: String
  },
  price: {
    required: false,
    type: String
  },
  categoryID: {
    required: true,
    type: String,
    ref: 'category'
  },
  quantity: {
    required: true,
    type: Number
  },
  image: {
    required: true,
    type: String
  },
})

module.exports = mongoose.model('product', productSchema)