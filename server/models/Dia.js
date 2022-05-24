const mongoose = require('mongoose');

const { Schema } = mongoose;

const diaSchema = new Schema({
  name: {
    type: String,
    required: true,
    enum: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  },
  horas: [{
    type: Schema.Types.ObjectId,
    ref: 'Hora'
  }],
  active: {
    type: Boolean,
    default: false
  }
});

const Dia = mongoose.model('Dia', diaSchema);

module.exports = Dia;

