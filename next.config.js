const PORT = process.env.PORT || 3000
const API_URL = process.env.NODE_ENV !== 'production' ? `http://localhost:${PORT}/api` : 'https://blablabla.herokuapp.com/api'

module.exports = {
  publicRuntimeConfig: { // Ficará acessível tanto no server quanto client
    API_URL
  }
}