const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  id:Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  dateOfSale: Date,
  sold: Boolean,
  image: String,
});

module.exports = mongoose.model('Product', ProductSchema);
