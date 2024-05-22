//Configurando express
const express = require('express')
const app = express()

//importando o banco
const db = require('./db/connexion')

//setando body parser
const bodyParser = require('body-parser')

//Setando a porta
const PORT = 3000

//utilizando body parser


//Ouvindo a porta
app.listen(PORT,function(){
    console.log(`O express está rodando na porta ${PORT}`)
})
//conexão do db
db.authenticate()
.then(() => {
    console.log('Conectou ao banco com sucesso')
})
.catch(err => {
    console.log('Ocorreu um erro ao conectar', err)
})
//Testando se a porta funciona(routes)
app.get('/',(req, res) =>{
    res.send('Está funcionando')
})

//utilizando body parser
app.use(bodyParser.urlencoded({ extended: false}))

