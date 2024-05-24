//Configurando express
const express = require('express')
const app = express()
//importando handlebars
const exphbs = require('express-handlebars')
//importando o banco
const db = require('./db/connexion')
//setando body parser
const bodyParser = require('body-parser')
//Setando a porta
const PORT = 3000
const path = require('path')
//Pegando todos os jobs
const Job  = require('./models/Job')
// consultas mais complexas, requisições mais complexas
const Sequelize  = require('sequelize')
const Op         = Sequelize.Op


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
app.get('/',(req, res)=>{  //Rota

    let search = req.query.job
    let query  = '%'+search+'%'//PH -> PHP. Word -> Wordpress, press -> Wordpress

    if(!search){
        Job.findAll({order: [//vai encontrar todas as jobs que tenho salvas e ordenar no array
            ['createdAt','DESC']// desc = os registros são ordenados do mais novo prpo mais velho    
        ]})
        .then(jobs => {
         res.render('index', {//renderizar o index.handlebars, que é o corpo do main.handlebars(estatico)
                jobs // redenrizar a view com as jobs dentro dela
         })
        })
        .catch(err => console.log(err))
    }else {
        Job.findAll({
            where: {title: {[Op.like]: query}},//fazer um consulta baseada no titulo de acordo com oq se pesquisou
            order: [
                ['createdAt','DESC']
        ]})
        .then(jobs => {
         res.render('index', {
            jobs, search
         })
        })

    }
})



//utilizando body parser
app.use(bodyParser.urlencoded({ extended: false}))

//handlebars
app.set('views', path.join(__dirname, '/views')) 
app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//pasta statica
app.use(express.static(path.join(__dirname, '/public')))

//rotas de job
app.use('/jobs', require('./routes/jobRoutes'))

