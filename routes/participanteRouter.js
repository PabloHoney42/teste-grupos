const express = require('express')
const router = express.Router()


const Participante = require('../participante.model')

// GET /api/participantes
router.get('/', function (req, res, next) {
  Participante.find(function (err, participantes) {
    if (err) () => console.log(err)

    res.json(participantes)
  })
})

module.exports = router