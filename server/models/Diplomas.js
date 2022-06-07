const mongoose = require('mongoose');

const { Schema } = mongoose;

const diplomasSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    trim: true,
  },
  imagen: {
    type: String
  }
});

const Diplomas = mongoose.model('Diplomas', diplomasSchema);

module.exports = Diplomas;

