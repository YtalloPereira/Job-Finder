const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

//rota teste
router.get('/test', (req, res) =>{
    res.send('deu certo')
})


//rota teste
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
