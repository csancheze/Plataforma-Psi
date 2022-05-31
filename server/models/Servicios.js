const mongoose = require('mongoose');

const { Schema } = mongoose;

const serviciosSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  costo: {
    type: String
  }
});

const Servicios = mongoose.model('Servicios', serviciosSchema);

module.exports = Servicios;

