const express = require('express')
const router = express.Router()

const participantes = require('../mock/participantes.json')

// GET /api/participantes
router.get('/', function(req, res, next) {
  res.json(participantes)
})

module.exports = router