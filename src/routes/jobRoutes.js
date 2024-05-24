const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

//rota teste
router.get('/test', (req, res) =>{
    res.send('deu certo')
})

//detalhes da vaga > view/1 > view/2
router.get('/view/:id', (req, res) => Job.findOne({
    where: {id: req.params.id}
    }).then(job =>{
        res.render('view',{
            job
        })
    }).catch(err => console.log(err))
)


//form da rota de envio
router.get('/add', (req, res) =>{
    res.render('add')
})

//adiciona uma vaga via post
router.post('/add',(req, res) => {
    let{title, description, salary, company, email, new_job} = req.body

    Job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err))
})

module.exports = router
