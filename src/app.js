//Configurando express
const express = require('express')
const app = express()

//importando o banco
const db = require('./db/connexion')

//Setando a porta
const PORT = 3000

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

