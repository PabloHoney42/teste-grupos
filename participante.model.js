const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define collection and schema para Participante
let Participante = new Schema({
  nome: {
    type: String
  },
  email: {
    type: String
  },
  foto: {
    type: String
  }
},{
    collection: 'participante'
});

module.exports = mongoose.model('Participante', Participante);