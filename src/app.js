//Configurando express
const express = require('express')
const app = express()
//Setando a porta
const PORT = 3000
//Ouvindo a porta
app.listen(PORT,function(){
    console.log(`O express está rodando na porta ${PORT}`)
})
//Testando se a porta funciona
app.get('/',(req, res) =>{
    res.send('Está funcionando')
})