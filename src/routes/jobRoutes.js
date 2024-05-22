const express = require('express')
const router = express.Router()
const Job = require('../models/Job')

//rota teste
router.get('/test', (req, res) =>{
    res.send('deu certo')
})

//adiciona uma vaga via post
router.post('/add',(req, res) => {
    let{title, salary, company, description, email, new_job} = req.body

    Job.Create({
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