const mongoose = require('mongoose');

const { Schema } = mongoose;

const modelosTSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String
  }
});

const ModelosT = mongoose.model('ModelosT', modelosTSchema);

module.exports = ModelosT;

