// Algoritmo para agrupamento de participantes em 4 grupos

function agruparParticipantes(participantes) {
  let tamanhoGrupo
  let grupos = []
  const qtdeParticipantes = participantes.length

  // tamanhoGrupo deve sempre ser igual a 4
  if (qtdeParticipantes % 4 == 0) {
    tamanhoGrupo = qtdeParticipantes / 4
  } else {
    tamanhoGrupo = Math.ceil(qtdeParticipantes / 4)
  }

  grupos.push([])
  let indiceGrupo = 0

  // distribui os participantes de acordo com o tamanho de cada grupo
  for (let i = 0; i < qtdeParticipantes; i++) {
    grupos[indiceGrupo].push(participantes[i])

    let restantes = qtdeParticipantes - (i + 1)
    let gruposRestantes = 4 - grupos.length
    // para não acontecer de ter menos gente do que grupos restantes
    if (restantes == gruposRestantes) tamanhoGrupo = 1

    if ((i + 1) % tamanhoGrupo == 0 && (i + 1) < qtdeParticipantes) {
      // cria mais um grupo quando a capacidade do atual é alcançada
      indiceGrupo++
      grupos.push([])
    }
  }

  return grupos
}

export {
  agruparParticipantes
}
