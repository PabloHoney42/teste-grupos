# Teste-Grupos
[https://young-ravine-47082.herokuapp.com/]  
Aplicação React que exibe uma lista de dados mockados do servidor Node

## Tecnologias utilizadas
Backend: Node.js, Express.js e framework [Next.js](https://github.com/zeit/next.js) para SSR com React.js.  
Frontend: React.js e set de módulos css [Pure.css](https://purecss.io/)  
Banco de dados: `MongoDB Atlas`

## Detalhes da API
Possui apenas o endpoint GET /api/participantes, que retorna uma lista de 117 objetos com os campos Nome, Email e Foto. A lista de participantes é requisitada pela página ao banco de dados e os objetos são agrupados em 4 grupos de forma aleatória (independentemente da quantidade de registros)
(Dados gerados no site [json-generator.com](https://www.json-generator.com/))

## Instruções para instalação *(localmente)*
basta instalar os módulos npm com `npm install` e executar o script `npm run pre`. Por padrão, aplicação será acessada pelo endereço `http://localhost:3000`, mas a porta pode ser alterada setando a variável de ambiente PORT. Versão do node utilizada: `11.11.0`. npm: `6.7.0`.
