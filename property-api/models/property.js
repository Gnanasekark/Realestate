const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  location: { type: String },
  image: { type: String }, // filename for uploaded image
}, { timestamps: true });

module.exports = mongoose.model('Property', propertySchema);
