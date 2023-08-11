const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryName: {
    required: true,
    type: String
  },
  description: {
    required: false,
    type: String
  },
})

module.exports = mongoose.model('category', categorySchema)