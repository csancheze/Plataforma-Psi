const mongoose = require('mongoose');

const { Schema } = mongoose;

const areasSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  }
});

const Areas = mongoose.model('Areas', areasSchema);

module.exports = Areas;

