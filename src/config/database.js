const {Sequelize} = require('sequelize')

const db = new Sequelize('hornero', 'root', '', { 
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = db