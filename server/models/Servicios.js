const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviciosSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  costo: {
    type: Number
  }
});

const Servicios = mongoose.model('Servicios', serviciosSchema);

module.exports = Servicios;

