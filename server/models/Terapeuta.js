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
  email: {
    type: String,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  cedula: {
    type: String,
  },
  bio: {
    type: String,
  },
  modelo: {
      type: Schema.Types.ObjectId,
      ref: 'Modelos'
    }
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
