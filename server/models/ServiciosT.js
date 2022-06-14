const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviciosTSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  costo: {
    type: String
  }
});

const ServiciosT = mongoose.model('ServiciosT', serviciosTSchema);

module.exports = ServiciosT;

