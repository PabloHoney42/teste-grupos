import Head from 'next/head'
import getConfig from 'next/config'
import axios from 'axios'

import { agruparParticipantes } from '../src/agrupamento'

const { publicRuntimeConfig } = getConfig()
const { API_URL } = publicRuntimeConfig

const Index = (props) => (
  <div className="main">
    <div className="header">
      <h1>Participantes:</h1>
      <h2>Total de participantes: {props.grupos.reduce((acmlator, current) => Array(acmlator.length + current.length)).length}</h2>
    </div>
    <div className="content">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
        <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w"
          crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/grids-responsive-min.css" />
        <link rel="stylesheet" href="/static/style.css" />
      </Head>

      {props.grupos.map((grupo, indice) => {
        return (
          <table key={indice} class="pure-table pure-table-striped">
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
                <tr key={participante.id}>
                  <td><img src={participante.foto} /></td>
                  <td>{participante.nome}</td>
                  <td>{participante.email}</td>
                  <td>{participante.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      })}
    </div>
  </div>
)

Index.getInitialProps = async () => {
  const participantes = await axios.get(`${API_URL}/participantes`)
  const grupos = agruparParticipantes(participantes.data)

  return {
    participantes: participantes.data,
    grupos
  }
}

export default Index