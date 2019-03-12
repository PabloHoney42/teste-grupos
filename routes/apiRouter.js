const express = require('express')
const router = express.Router()

const participanteRouter = require('./participanteRouter')

// GET/PUT/POST/DELETE /api/participantes
router.use('/participantes', participanteRouter)

module.exports = router