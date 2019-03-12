# Teste-Grupos
Aplicação React que exibe uma lista de dados mockados do servidor Node

## Tecnologias utilizadas
Backend: Node.js, Express.js e framework [Next.js](https://github.com/zeit/next.js) para SSR com React.js.
Frontend: React.js e set de módulos css [Pure.css](https://purecss.io/)

## Detalhes da API
Possui apenas o endpoint GET /api/participantes, que retorna uma lista de 117 objetos com os campos Nome, Email e Foto. Esses dados estão
no arquivo [participantes.json](https://github.com/PabloHoney42/teste01/blob/master/mock/participantes.json) 
(Dados gerados no site [json-generator.com](https://www.json-generator.com/))

## Instruções para instalação
basta instalar os módulos npm com `npm install` e executar o script `npm run pre`. Por padrão, aplicação será acessada pelo endereço `http://localhost:3000`, mas a porta pode ser alterada setando a variável de ambiente PORT. Versão do node utilizada: `11.11.0`. npm: `6.7.0`.
