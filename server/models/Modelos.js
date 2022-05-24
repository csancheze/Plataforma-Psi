const mongoose = require('mongoose');

const { Schema } = mongoose;

const modelosSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String
  }
});

const Modelos = mongoose.model('Modelos', modelosSchema);

module.exports = Modelos;

