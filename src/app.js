//Configurando express
const express = require('express')
const app = express()

//importando handlebars
const exphbs = require('express-handlebars');

//importando o banco
const db = require('./db/connexion')

//setando body parser
const bodyParser = require('body-parser')

//Setando a porta
const PORT = 3000

const path = require('path')


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
    res.send('index')
})

//utilizando body parser
app.use(bodyParser.urlencoded({ extended: false}))

//handlebars
app.set('views', path.join(__dirname, 'src/views')) 
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//pasta statica
app.use(express.static(path.join(__dirname, 'src/public')));

//rotas de job
app.use('/jobs', require('./routes/jobRoutes'))

