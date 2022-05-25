const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const pacienteSchema = new Schema({

  _id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  terapeuta:  {
    type: Schema.Types.ObjectId,
    ref: 'Terapeuta'
  },
  nombre: {
    type: String,
  },
  correo: {
    type: String,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  notas: [{
    type: String,
  }]
});

const Paciente= mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;
