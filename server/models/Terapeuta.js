const mongoose = require('mongoose');
const { Schema } = require('mongoose');


const terapeutaSchema = new Schema({

  _id: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  nombre: {
    type: String,
  },
  titulo: {
    type: String,
  },
  correo: {
    type: String,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  cedula: {
    type: String,
  },
  foto: {
    type: String,
  },
  bio: {
    type: String,
  },
  modelos: [{
      type: Schema.Types.ObjectId,
      ref: 'Modelos'
    }]
  ,
  servicios: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Servicios'
    }
  ],
  areas: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Areas'
    }
  ],
  formacion: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Diplomas'
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Posts'
    }
  ],
  pacientes: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Paciente'
    }
  ],
  dias: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Dia'
    },
  ]
});

const Terapeuta= mongoose.model('Terapeuta', terapeutaSchema);

module.exports = Terapeuta;
