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
//Pegando todos os jobs
const Job  = require('./models/Job');

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
//Pegando todas as vagas e ordenando em ordem decrescente de criação
//Renderizando a view com as vagas nela
app.get('/',(req, res) =>{
    Job.findAll({order: [
        ['createdAt', 'DESC']
    ]})
    .then(jobs =>{
        res.render('index',{
            jobs
        })
    })
})


//utilizando body parser
app.use(bodyParser.urlencoded({ extended: false}))

//handlebars
app.set('views', path.join(__dirname, '/views')) 
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//pasta statica
app.use(express.static(path.join(__dirname, 'src/public')));

//rotas de job
app.use('/jobs', require('./routes/jobRoutes'))

