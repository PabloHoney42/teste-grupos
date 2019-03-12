const Participante = require('../participante.model')
const participantesJson = require('../mock/participantes.json')

module.exports = {
  resetdb: function () {
    Participante.insertMany(participantesJson)
      .then(saved => console.log('> mongodb resetado com dados originais'))
      .catch(err => console.log("Erro ao tentar resetar a database"))
  }
}