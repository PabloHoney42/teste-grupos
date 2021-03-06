import Head from 'next/head'
import getConfig from 'next/config'
import axios from 'axios'

import { agruparParticipantes } from '../src/agrupamento'
import { shuffleArray } from '../src/shuffleArray'

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig

export default class Index extends React.Component {

  constructor(props) {
    super(props)
    const { grupos } = props
    this.state = {
      grupos
    }
  }

  static async getInitialProps() {
    const res = await axios.get(`${API_URL}/participantes`)
    const lista = res.data
    const grupos = agruparParticipantes(shuffleArray(lista)) // "embaralha" os participantes a cada requisição

    return {
      grupos
    }
  }

  rearranjar() {
    const lista = this.state.grupos.reduce((accumulator, current) =>
      accumulator.concat(current)
    )
    const grupos = agruparParticipantes(shuffleArray(lista))
    this.setState({grupos})
  }

  render() {
    return (
      <div className="main">
        <div className="header">
          <h1>Participantes:</h1>
          <h2>Total de participantes: {this.state.grupos.reduce((acmlator, current) => Array(acmlator.length + current.length)).length}</h2>
          <button className="pure-button button-secondary" onClick={() => this.rearranjar()}>Rearranjar grupos aleatóriamente</button>
        </div>
        <div className="content">
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
            <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w"
              crossOrigin="anonymous" />
            <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/grids-responsive-min.css" />
            <link rel="stylesheet" href="/static/style.css" />
          </Head>

          {this.state.grupos.map((grupo, indice) => {
            return (
              <table key={indice} className="pure-table pure-table-striped">
                <caption>Grupo {indice + 1} - Quantidade: {grupo.length}</caption>
                <thead>
                  <tr>
                    <th>Foto</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>ID</th>
                  </tr>
                </thead>

                <tbody>
                  {grupo.map(participante => (
                    <tr key={participante._id}>
                      <td><img src={participante.foto} /></td>
                      <td>{participante.nome}</td>
                      <td>{participante.email}</td>
                      <td>{participante._id}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )
          })}
        </div>
      </div>
    )
  }
}