const mongoose = require('mongoose');

const { Schema } = mongoose;

const horaSchema = new Schema({
    dia: {
        type: Schema.Types.ObjectId,
        ref: 'Dia'
      },
    tiempo: {
        type: String,
        enum: ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00", "20:00","21:00"]
    },
    active: {
        type: Boolean,
        default: false
    }
});

const Hora = mongoose.model('hora', horaSchema);

module.exports = Hora;

