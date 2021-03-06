const mongoose = require("mongoose");

module.exports = productSchema = new mongoose.Schema({
  price: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  inventory: {
    type: Number,
    required: true,
  },
  cartAmount: {
    type: Number,
    required: true,
  },
  imageId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  }
});

module.exports = mongoose.model("Product", productSchema);
