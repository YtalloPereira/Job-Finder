const Sequelize = require('sequelize')
const db = require('../db/connexion')

const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.STRING,
    },
    salary : {
        type: Sequelize.STRING,
    },
    comapany : {
        type: Sequelize.STRING,
    },
    email : {
        type: Sequelize.STRING,
    },
    new_job : {
        type: Sequelize.INTEGER,
    }
})

module.exports = Job